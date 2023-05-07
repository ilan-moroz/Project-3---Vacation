export class Vacation {
  public destination: string;
  public description: string;
  public vacationStart: string;
  public vacationEnd: string;
  public price: number;
  public imageFile: string;
  constructor(
    destination: string,
    description: string,
    vacationStart: string,
    vacationEnd: string,
    price: number,
    imageFile: string
  ) {
    this.destination = destination;
    this.description = description;
    this.vacationStart = vacationStart;
    this.vacationEnd = vacationEnd;
    this.price = price;
    this.imageFile = imageFile;
  }
}
