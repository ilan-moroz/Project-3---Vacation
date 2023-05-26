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
export const userLoginAction = (
  firstName: string,
  lastName: string,
  role: string
) => {
  return {
    type: UserActionType.userLogin,
    payload: { firstName, lastName, role },
  };
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
      newState.currentUser = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: action.payload.role,
      };
      newState.role = action.payload.role;
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
