// interface for followers
interface Followers {
  userKey: number;
  vacationKey: number;
}

// Initial state
export class FollowState {
  followers: Followers[] = [];
}

//what action i will use
export enum FollowActionType {
  addFollow = "addFollow",
  removeFollow = "removeFollow",
  allFollowers = "allFollowers",
}

//action data structure
export interface FollowAction {
  type: FollowActionType;
  payload?: any;
}

// Functions to dispatch actions
export const allFollowersAction = (followers: Followers[]): FollowAction => {
  return { type: FollowActionType.allFollowers, payload: followers };
};

export const addFollowAction = (
  userKey: number,
  vacationKey: number
): FollowAction => {
  return {
    type: FollowActionType.addFollow,
    payload: { userKey, vacationKey },
  };
};

export const removeFollowAction = (
  userKey: number,
  vacationKey: number
): FollowAction => {
  return {
    type: FollowActionType.removeFollow,
    payload: { userKey, vacationKey },
  };
};

//this is the reducer function
export function FollowReducer(
  currentState: FollowState = new FollowState(),
  action: FollowAction
): FollowState {
  const newState = { ...currentState };
  switch (action.type) {
    case FollowActionType.allFollowers:
      newState.followers = action.payload;
      break;
    case FollowActionType.addFollow:
      // Add new follow to the array
      return {
        ...currentState,
        followers: [...currentState.followers, action.payload],
      };
    case FollowActionType.removeFollow:
      // Remove the specific follow from the array
      return {
        ...currentState,
        followers: currentState.followers.filter(
          (follow) =>
            follow.userKey !== action.payload.userKey ||
            follow.vacationKey !== action.payload.vacationKey
        ),
      };
  }
  return newState;
}
