export class Vacation {
  public vacationDestiny: string;
  public vacationDesc: string;
  public vacationStart: string;
  public vacationEnd: string;
  public price: number;
  public photoFile: string;
  constructor(
    vacationDestiny: string,
    vacationDesc: string,
    vacationStart: string,
    vacationEnd: string,
    price: number,
    photoFile: string
  ) {
    this.vacationDestiny = vacationDestiny;
    this.vacationDesc = vacationDesc;
    this.vacationStart = vacationStart;
    this.vacationEnd = vacationEnd;
    this.price = price;
    this.photoFile = photoFile;
  }
}
