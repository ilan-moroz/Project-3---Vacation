import { User } from "../Model/User";

//initial state
export class UsersState {
  public currentUser: User | null = null;
  public role: string | null = null;
}

//what action i will use...
export enum UserActionType {
  userLogin = "userLogin",
  adminLogin = "adminLogin",
  userLogout = "userLogout",
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

// set state as user if user is logged in
export const adminLoginAction = (admin: User): UserAction => {
  return { type: UserActionType.adminLogin, payload: admin };
};

// Log out the user
export const userLogoutAction = (): UserAction => {
  return { type: UserActionType.userLogout };
};

//this is the reducer function
export function UserReducer(
  currentState: UsersState = new UsersState(),
  action: UserAction
): UsersState {
  const newState = { ...currentState };
  switch (action.type) {
    case UserActionType.userLogin:
      newState.currentUser = action.payload;
      newState.role = "user";
      break;
    case UserActionType.adminLogin:
      newState.currentUser = action.payload;
      newState.role = "admin";
      break;
    case UserActionType.userLogout: // handle logout
      newState.currentUser = null;
      newState.role = null;
      break;
  }
  return newState;
}
