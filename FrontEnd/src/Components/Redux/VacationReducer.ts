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
export function UserReducer(
  currentState: VacationsState = new VacationsState(),
  action: VacationAction
): VacationsState {
  const newState = { ...currentState };
  switch (action.type) {
    case VacationActionType.addVacation:
      newState.vacations = [...currentState.vacations, action.payload];
      break;
  }
  return newState;
}
