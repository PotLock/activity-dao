# ActivityContract Documentation

The ActivityContract is a Solidity smart contract that manages activities and user interests. It allows administrators to add and delete activities, while users can show or remove interest in these activities.


Testnet: Base Spolia Deployed Address [0x4d00852b2ff04a57210194ed21db1072fd26eb20](https://sepolia.basescan.org/address/0x4d00852b2ff04a57210194ed21db1072fd26eb20)
Staging: 
Mainnet

### Key Features

- **Activity Management**: Admins can add and delete activities in batches.
- **Interest Registration**: Users can show or remove interest in activities.
- **Participant Tracking**: The contract tracks participants for each activity.
- **Access Control**: Uses OpenZeppelin's AccessControl for role-based permissions.
- **Upgradeable**: Implements the UUPS upgradeable pattern.
- **Pausable**: Contract can be paused/unpaused by admins.

### Main Functions

- `addActivities`: Add new activities (admin only).
- `deleteActivities`: Delete existing activities (admin only).
- `showInterest`: Users can show interest in an activity.
- `removeInterest`: Users can remove their interest from an activity.
- `getInterests`: Get all activities a user is interested in.
- `getAllActivities`: Get all available activities.

## Interface

```tsx
interface ActivityContractInterface {
  addActivities: (activityIds: number[]) => Promise<void>;
  deleteActivities: (activityIds: number[]) => Promise<void>;
  showInterest: (activityId: number) => Promise<void>;
  removeInterest: (activityId: number) => Promise<void>;
  getInterests: (account: string) => Promise<number[]>;
  getAllActivities: () => Promise<number[]>;
  pause: () => Promise<void>;
  unpause: () => Promise<void>;
  setMaxParticipantsPerActivity: (maxParticipants: number) => Promise<void>;
}

```

## Example Usage with wagmi.js

Here are code snippets for implementing getters and setters using wagmi.js:

```tsx
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { activityContractABI, activityContractAddress } from './constants';

// Getter: Get all activities
export const useGetAllActivities = () => {
  const { data, isError, isLoading } = useContractRead({
    address: activityContractAddress,
    abi: activityContractABI,
    functionName: 'getAllActivities',
  });

  return { activities: data, isError, isLoading };
};

// Getter: Get user interests
export const useGetUserInterests = (userAddress: string) => {
  const { data, isError, isLoading } = useContractRead({
    address: activityContractAddress,
    abi: activityContractABI,
    functionName: 'getInterests',
    args: [userAddress],
  });

  return { interests: data, isError, isLoading };
};

// Setter: Show interest in an activity
export const useShowInterest = () => {
  const { write, data, isLoading, isError } = useContractWrite({
    address: activityContractAddress,
    abi: activityContractABI,
    functionName: 'showInterest',
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const showInterest = (activityId: number) => {
    write({ args: [activityId] });
  };

  return { showInterest, isLoading: isLoading || isWaiting, isError, isSuccess };
};

// Setter: Remove interest from an activity
export const useRemoveInterest = () => {
  const { write, data, isLoading, isError } = useContractWrite({
    address: activityContractAddress,
    abi: activityContractABI,
    functionName: 'removeInterest',
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const removeInterest = (activityId: number) => {
    write({ args: [activityId] });
  };

  return { removeInterest, isLoading: isLoading || isWaiting, isError, isSuccess };
};

// Admin function: Add activities
export const useAddActivities = () => {
  const { write, data, isLoading, isError } = useContractWrite({
    address: activityContractAddress,
    abi: activityContractABI,
    functionName: 'addActivities',
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const addActivities = (activityIds: number[]) => {
    write({ args: [activityIds] });
  };

  return { addActivities, isLoading: isLoading || isWaiting, isError, isSuccess };
};

```

## Usage Examples

```tsx
import { useGetAllActivities, useShowInterest, useRemoveInterest } from './activityHooks';

// In a React component
const ActivityList = () => {
  const { activities, isLoading, isError } = useGetAllActivities();
  const { showInterest, isLoading: isShowingInterest } = useShowInterest();
  const { removeInterest, isLoading: isRemovingInterest } = useRemoveInterest();

  if (isLoading) return <div>Loading activities...</div>;
  if (isError) return <div>Error loading activities</div>;

  return (
    <ul>
      {activities.map((activityId) => (
        <li key={activityId}>
          Activity {activityId}
          <button onClick={() => showInterest(activityId)} disabled={isShowingInterest}>
            Show Interest
          </button>
          <button onClick={() => removeInterest(activityId)} disabled={isRemovingInterest}>
            Remove Interest
          </button>
        </li>
      ))}
    </ul>
  );
};

```

This implementation provides a clean and type-safe way to interact with the ActivityContract using wagmi.js in a React application. The hooks encapsulate the contract interactions, making it easy to manage state and handle loading/error conditions.