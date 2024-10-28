// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract ActivityContract is
    Initializable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.Bytes32Set;

    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    EnumerableSetUpgradeable.Bytes32Set private _activities;
    mapping(bytes32 => EnumerableSetUpgradeable.AddressSet) private _activityParticipants;
    mapping(address => EnumerableSetUpgradeable.Bytes32Set) private _userInterests;
    EnumerableSetUpgradeable.AddressSet private _allParticipants;

    uint256 public constant MAX_BATCH_SIZE = 100;
    uint256 public upgradeTimelock;
    address private _pendingUpgradeImplementation;

    uint256 public constant MAX_RETURN_SIZE = 1000; // New constant for maximum return size

    error NoActivitiesProvided();
    error BatchSizeExceedsLimit(uint256 provided, uint256 limit);
    error EmptySlugIdNotAllowed(uint256 index);
    error ActivityAlreadyExists(string slugId);

    event InterestRegistered(address indexed account, string activityId);
    event InterestRemoved(address indexed account, string activityId);
    event ActivityAdded(string activityId);
    event ActivityDeleted(string activityId);
    event BatchInterestRemoval(string activityId, uint indexed removedCount);
    event ContractPaused(address indexed account);
    event ContractUnpaused(address indexed account);
    event UpgradeTimelockSet(uint256 timelock);
    event AdminAdded(address indexed account);
    event AdminRemoved(address indexed account);
    event UpgradeImplementationSet(address indexed newImplementation);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ReentrancyGuard_init();
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OWNER_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);

        upgradeTimelock = 0;
    }

    function addAdmin(address newAdmin) external onlyRole(OWNER_ROLE) {
        grantRole(ADMIN_ROLE, newAdmin);
        emit AdminAdded(newAdmin);
    }

    function removeAdmin(address admin) external onlyRole(OWNER_ROLE) {
        revokeRole(ADMIN_ROLE, admin);
        emit AdminRemoved(admin);
    }

    function addActivities(string[] calldata slugIds) external nonReentrant onlyRole(ADMIN_ROLE) {
        if (slugIds.length == 0) revert NoActivitiesProvided();
        if (slugIds.length > MAX_BATCH_SIZE) revert BatchSizeExceedsLimit(slugIds.length, MAX_BATCH_SIZE);

        for (uint i = 0; i < slugIds.length;) {
            bytes32 slugIdBytes = keccak256(bytes(slugIds[i]));
            if (slugIdBytes == bytes32(0)) revert EmptySlugIdNotAllowed(i);
            if (_activities.contains(slugIdBytes)) revert ActivityAlreadyExists(slugIds[i]);

            _activities.add(slugIdBytes);
            emit ActivityAdded(slugIds[i]);

            unchecked { i++; }
        }
    }

    function deleteActivities(string[] calldata activityIds) external nonReentrant onlyRole(ADMIN_ROLE) {
        require(activityIds.length > 0 && activityIds.length <= MAX_BATCH_SIZE, "Invalid batch size");

        for (uint i = 0; i < activityIds.length;) {
            bytes32 activityIdBytes = keccak256(bytes(activityIds[i]));
            if (_activities.remove(activityIdBytes)) {
                uint removedCount = _removeAllInterestsForActivity(activityIdBytes);
                emit ActivityDeleted(activityIds[i]);
                emit BatchInterestRemoval(activityIds[i], removedCount);
            }

            unchecked { i++; }
        }
    }

    function _removeAllInterestsForActivity(bytes32 activityIdBytes) private onlyRole(ADMIN_ROLE) returns (uint256) {
        uint256 participantCount = _activityParticipants[activityIdBytes].length();
        uint256 removedCount = 0;

        for (uint256 i = 0; i < participantCount;) {
            address participant = _activityParticipants[activityIdBytes].at(0);
            if (_removeInterestInternal(participant, activityIdBytes)) {
                removedCount++;
            }

            unchecked { i++; }
        }

        delete _activityParticipants[activityIdBytes];
        return removedCount;
    }

    function showInterest(string calldata activityId) external nonReentrant whenNotPaused {
        bytes32 activityIdBytes = keccak256(bytes(activityId));
        require(_activities.contains(activityIdBytes), "Activity does not exist");
        require(!_userInterests[msg.sender].contains(activityIdBytes), "Already interested in this activity");

        _userInterests[msg.sender].add(activityIdBytes);
        _activityParticipants[activityIdBytes].add(msg.sender);
        _allParticipants.add(msg.sender);

        emit InterestRegistered(msg.sender, activityId);
    }

    function removeInterest(string calldata activityId) external nonReentrant whenNotPaused {
        bytes32 activityIdBytes = keccak256(bytes(activityId));
        require(_userInterests[msg.sender].contains(activityIdBytes), "Not interested in this activity");

        _removeInterestInternal(msg.sender, activityIdBytes);

        emit InterestRemoved(msg.sender, activityId);
    }

    function _removeInterestInternal(address account, bytes32 activityIdBytes) private returns (bool) {
        if (_userInterests[account].remove(activityIdBytes)) {
            _activityParticipants[activityIdBytes].remove(account);

            if (_userInterests[account].length() == 0) {
                _allParticipants.remove(account);
            }
            return true;
        }
        return false;
    }

    function getInterests(address account, uint256 offset, uint256 limit) external view returns (string[] memory) {
        require(limit <= MAX_RETURN_SIZE, "Limit exceeds maximum return size");
        bytes32[] memory interestBytes = _userInterests[account].values();
        uint256 end = offset + limit > interestBytes.length ? interestBytes.length : offset + limit;
        string[] memory interests = new string[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            interests[i - offset] = string(abi.encodePacked(interestBytes[i]));
        }
        return interests;
    }

    function getAllAccountsForInterests(uint256 offset, uint256 limit) external view onlyRole(ADMIN_ROLE) returns (address[] memory) {
        require(limit <= MAX_RETURN_SIZE, "Limit exceeds maximum return size");
        address[] memory allParticipants = _allParticipants.values();
        uint256 end = offset + limit > allParticipants.length ? allParticipants.length : offset + limit;
        address[] memory participants = new address[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            participants[i - offset] = allParticipants[i];
        }
        return participants;
    }

    function getInterestByAccount(string calldata activityId, address account) external view returns (bool) {
        return _userInterests[account].contains(keccak256(bytes(activityId)));
    }

    function getActivityParticipants(string calldata activityId, uint256 offset, uint256 limit) external view onlyRole(ADMIN_ROLE) returns (address[] memory) {
        require(limit <= MAX_RETURN_SIZE, "Limit exceeds maximum return size");
        address[] memory participants = _activityParticipants[keccak256(bytes(activityId))].values();
        uint256 end = offset + limit > participants.length ? participants.length : offset + limit;
        address[] memory result = new address[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = participants[i];
        }
        return result;
    }

    function getAllActivities(uint256 offset, uint256 limit) external view returns (string[] memory) {
        require(limit <= MAX_RETURN_SIZE, "Limit exceeds maximum return size");
        bytes32[] memory activityBytes = _activities.values();
        uint256 end = offset + limit > activityBytes.length ? activityBytes.length : offset + limit;
        string[] memory activities = new string[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            activities[i - offset] = string(abi.encodePacked(activityBytes[i]));
        }
        return activities;
    }

    function pause() external onlyRole(OWNER_ROLE) {
        _pause();
        emit ContractPaused(msg.sender);
    }

    function unpause() external onlyRole(OWNER_ROLE) {
        _unpause();
        emit ContractUnpaused(msg.sender);
    }

    function setUpgradeTimelock(uint256 timelock) external onlyRole(OWNER_ROLE) {
        upgradeTimelock = block.timestamp + timelock;
        emit UpgradeTimelockSet(upgradeTimelock);
    }

    function setPendingUpgradeImplementation(address newImplementation) external onlyRole(UPGRADER_ROLE) {
        require(newImplementation != address(0), "Invalid implementation address");
        _pendingUpgradeImplementation = newImplementation;
        emit UpgradeImplementationSet(newImplementation);
    }

    function _authorizeUpgrade(address newImplementation) internal view override {
        require(newImplementation == _pendingUpgradeImplementation, "Unauthorized upgrade");
        require(block.timestamp >= upgradeTimelock, "Upgrade timelock not expired");
    }

    function revokeRole(bytes32 role, address account) public override onlyRole(OWNER_ROLE) {
        require(role != OWNER_ROLE, "Cannot revoke owner role");
        _revokeRole(role, account);
    }
}
