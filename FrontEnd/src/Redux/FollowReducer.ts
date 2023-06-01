// Initial state
export class FollowState {
  followers: { userKey: number; VacationKey: number }[] = [];
}

//what action i will use
export enum FollowActionType {
  addFollow = "addFollow",
  removeFollow = "removeFollow",
}

//action data structure
export interface FollowAction {
  type: FollowActionType;
  payload?: any;
}

// Functions to dispatch actions
export const addFollowAction = (
  userKey: number,
  VacationKey: number
): FollowAction => {
  return {
    type: FollowActionType.addFollow,
    payload: { userKey, VacationKey },
  };
};

export const removeFollowAction = (
  userKey: number,
  VacationKey: number
): FollowAction => {
  return {
    type: FollowActionType.removeFollow,
    payload: { userKey, VacationKey },
  };
};

//this is the reducer function
export function FollowReducer(
  currentState: FollowState = new FollowState(),
  action: FollowAction
): FollowState {
  const newState = { ...currentState };
  switch (action.type) {
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
            follow.VacationKey !== action.payload.VacationKey
        ),
      };
  }
  return newState;
}
