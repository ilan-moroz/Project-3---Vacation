import { User } from "../Model/User";

//initial state
export class UsersState {
  public allUsers: User[] = [];
}

//what action i will use...
export enum SongActionType {
  addNewUser = "addNewUser",
  userLogin = "userLogin",
  allUsers = "allUsers",
}

//action data structure
export interface UserAction {
  type: SongActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
export const addNewUserAction = (newUser: User): UserAction => {
  return { type: SongActionType.addNewUser, payload: newUser };
};

//this is the reducer function
export function UserReducer(
  currentState: UsersState = new UsersState(),
  action: UserAction
): UsersState {
  const newState = { ...currentState };
  switch (action.type) {
    case SongActionType.addNewUser:
      newState.allUsers = [...newState.allUsers, action.payload];
      break;
  }

  return newState;
}
