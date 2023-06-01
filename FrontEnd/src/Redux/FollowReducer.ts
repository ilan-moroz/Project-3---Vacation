// Initial state
export class FollowState {
  followers: number[] = [];
}

//what action i will use
export enum FollowActionType {
  addFollow = "addFollow",
  removeFollow = "allVacations",
}

//action data structure
export interface FollowAction {
  type: FollowActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
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
      break;

    case FollowActionType.removeFollow:
      break;
  }
  return newState;
}
