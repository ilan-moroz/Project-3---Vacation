import { Vacation } from "./Vacation";

export class VacationWithKey extends Vacation {
  public vacationKey: number;

  constructor(
    vacationDestiny: string,
    vacationDesc: string,
    vacationStart: string,
    vacationEnd: string,
    price: number,
    photoFile: string,
    vacationKey: number
  ) {
    super(
      vacationDestiny,
      vacationDesc,
      vacationStart,
      vacationEnd,
      price,
      photoFile
    );
    this.vacationKey = vacationKey;
  }
}
