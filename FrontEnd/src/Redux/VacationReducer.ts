import { Vacation } from "../Model/Vacation";
import { VacationWithKey } from "../Model/VacationWithKey";

//initial state
export class VacationsState {
  public vacations: VacationWithKey[] = [];
}

//what action i will use
export enum VacationActionType {
  addVacation = "addVacation",
  allVacations = "allVacations",
  deleteVacation = "deleteVacation",
  editVacation = "editVacation",
}

//action data structure
export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
export const newVacationAction = (
  newVacation: VacationWithKey
): VacationAction => {
  return { type: VacationActionType.addVacation, payload: newVacation };
};

export const allVacationsAction = (
  vacations: VacationWithKey[]
): VacationAction => {
  return { type: VacationActionType.allVacations, payload: vacations };
};

export const editVacationsAction = (
  updatedVacations: Vacation
): VacationAction => {
  return { type: VacationActionType.editVacation, payload: updatedVacations };
};

export const deleteVacationAction = (
  vacationDestiny: string
): VacationAction => {
  return { type: VacationActionType.deleteVacation, payload: vacationDestiny };
};

//this is the reducer function
export function VacationReducer(
  currentState: VacationsState = new VacationsState(),
  action: VacationAction
): VacationsState {
  const newState = { ...currentState };
  switch (action.type) {
    case VacationActionType.addVacation:
      newState.vacations = [...currentState.vacations, action.payload];
      break;
    case VacationActionType.allVacations:
      newState.vacations = action.payload;
      break;
    case VacationActionType.editVacation:
      newState.vacations = [...newState.vacations].filter(
        (item) => item.vacationDestiny !== action.payload.vacationDestiny
      );
      newState.vacations = [...newState.vacations, action.payload];
      break;
    case VacationActionType.deleteVacation:
      newState.vacations = newState.vacations.filter(
        (vacation) => vacation.vacationDestiny !== action.payload
      );
      break;
  }
  return newState;
}
