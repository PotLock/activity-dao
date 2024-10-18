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
using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet;
using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

EnumerableSetUpgradeable.UintSet private _activities;
mapping(uint => EnumerableSetUpgradeable.AddressSet) private _activityParticipants;
mapping(address => EnumerableSetUpgradeable.UintSet) private _userInterests;
EnumerableSetUpgradeable.AddressSet private _allParticipants;

uint256 public constant MAX_BATCH_SIZE = 100;
uint256 public maxParticipantsPerActivity;  // Limit participants per activity

event InterestRegistered(address indexed account, uint indexed activityId);
event InterestRemoved(address indexed account, uint indexed activityId);
event ActivityAdded(uint indexed activityId);
event ActivityDeleted(uint indexed activityId);
event BatchInterestRemoval(uint indexed activityId, uint indexed removedCount);
event ContractPaused(address indexed account);
event ContractUnpaused(address indexed account);

/// @custom:oz-upgrades-unsafe-allow constructor
constructor() {
    _disableInitializers();
}
function initialize(address admin, uint256 maxParticipants) public initializer {
    __ReentrancyGuard_init();
    __Pausable_init();
    __AccessControl_init();
    __UUPSUpgradeable_init();

    _grantRole(DEFAULT_ADMIN_ROLE, admin);
    _grantRole(ADMIN_ROLE, admin);
    _grantRole(UPGRADER_ROLE, admin);

    maxParticipantsPerActivity = maxParticipants;
}

function addActivities(uint[] calldata activityIds) external onlyRole(ADMIN_ROLE) {
    require(activityIds.length > 0 && activityIds.length <= MAX_BATCH_SIZE, "Invalid batch size");

    for (uint i = 0; i < activityIds.length;) {
        require(activityIds[i] != 0, "Invalid activity ID");
        require(!_activities.contains(activityIds[i]), "Activity already exists");

        _activities.add(activityIds[i]);
        emit ActivityAdded(activityIds[i]);

        unchecked { i++; }  // Gas optimization
    }
}

function deleteActivities(uint[] calldata activityIds) external onlyRole(ADMIN_ROLE) {
    require(activityIds.length > 0 && activityIds.length <= MAX_BATCH_SIZE, "Invalid batch size");

    for (uint i = 0; i < activityIds.length;) {
        if (_activities.remove(activityIds[i])) {
            uint removedCount = _removeAllInterestsForActivity(activityIds[i]);
            emit ActivityDeleted(activityIds[i]);
            emit BatchInterestRemoval(activityIds[i], removedCount);
        }

        unchecked { i++; }  // Gas optimization
    }
}

function _removeAllInterestsForActivity(uint activityId) private returns (uint) {
    address[] memory participants = _activityParticipants[activityId].values();
    uint removedCount = 0;

    for (uint i = 0; i < participants.length;) {
        if (_removeInterestInternal(participants[i], activityId)) {
            removedCount++;
        }

        unchecked { i++; }  // Gas optimization
    }

    delete _activityParticipants[activityId];
    return removedCount;
}

function showInterest(uint activityId) external nonReentrant whenNotPaused {
    require(_activities.contains(activityId), "Activity does not exist");
    require(!_userInterests[msg.sender].contains(activityId), "Already interested in this activity");
    require(_activityParticipants[activityId].length() < maxParticipantsPerActivity, "Max participants reached");

    _userInterests[msg.sender].add(activityId);
    _activityParticipants[activityId].add(msg.sender);
    _allParticipants.add(msg.sender);

    emit InterestRegistered(msg.sender, activityId);
}

function removeInterest(uint activityId) external nonReentrant whenNotPaused {
    require(_userInterests[msg.sender].contains(activityId), "Not interested in this activity");

    _removeInterestInternal(msg.sender, activityId);

    emit InterestRemoved(msg.sender, activityId);
}

function _removeInterestInternal(address account, uint activityId) private returns (bool) {
    if (_userInterests[account].remove(activityId)) {
        _activityParticipants[activityId].remove(account);

        if (_userInterests[account].length() == 0) {
            _allParticipants.remove(account);
        }
        return true;
    }
    return false;
}

function getInterests(address account) external view returns (uint[] memory) {
    return _userInterests[account].values();
}

function getAllAccountsForInterests() external view onlyRole(ADMIN_ROLE) returns (address[] memory) {
    return _allParticipants.values();
}

function getInterestByAccount(uint activityId, address account) external view returns (bool) {
    return _userInterests[account].contains(activityId);
}

function getActivityParticipants(uint activityId) external view onlyRole(ADMIN_ROLE) returns (address[] memory) {
    return _activityParticipants[activityId].values();
}

function getAllActivities() external view returns (uint[] memory) {
    return _activities.values();
}

function pause() external onlyRole(ADMIN_ROLE) {
    _pause();
    emit ContractPaused(msg.sender);
}

function unpause() external onlyRole(ADMIN_ROLE) {
    _unpause();
    emit ContractUnpaused(msg.sender);
}

function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

function setMaxParticipantsPerActivity(uint256 maxParticipants) external onlyRole(ADMIN_ROLE) {
    maxParticipantsPerActivity = maxParticipants;
}

function revokeRole(bytes32 role, address account) public override onlyRole(DEFAULT_ADMIN_ROLE) {
    require(role != DEFAULT_ADMIN_ROLE, "Cannot revoke default admin role");
    _revokeRole(role, account);
}

}
