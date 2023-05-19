import { User } from "../Model/User";

//initial state
export class UsersState {
  public currentUser: User | null = null;
}

//what action i will use...
export enum UserActionType {
  userLogin = "userLogin",
  adminLogin = "adminLogin",
}

//action data structure
export interface UserAction {
  type: UserActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
// set state as user if user is logged in
export const userLoginAction = (user: User): UserAction => {
  return { type: UserActionType.userLogin, payload: user };
};

//this is the reducer function
export function UserReducer(
  currentState: UsersState = new UsersState(),
  action: UserAction
): UsersState {
  const newState = { ...currentState };
  switch (action.type) {
    case UserActionType.userLogin:
      newState.currentUser = action.payload.role;
      break;
    case UserActionType.adminLogin:
      newState.currentUser = action.payload.role;
      break;
  }
  return newState;
}
