import { Vacation } from "../Model/Vacation";

//initial state
export class VacationsState {
  public vacations: Vacation[] = [];
}

//what action i will use
export enum VacationActionType {
  addVacation = "addVacation",
}

//action data structure
export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
export const userVacationAction = (newVacation: Vacation): VacationAction => {
  return { type: VacationActionType.addVacation, payload: newVacation };
};

//this is the reducer function
// export function UserReducer(
//   currentState: UsersState = new UsersState(),
//   action: UserAction
// ): UsersState {
//   const newState = { ...currentState };
//   switch (action.type) {
//     case UserActionType.userLogin:
//       newState.currentUser = action.payload.admin;
//       break;
//     case UserActionType.adminLogin:
//       newState.currentUser = action.payload.admin;
//       break;
//   }
//   return newState;
// }
