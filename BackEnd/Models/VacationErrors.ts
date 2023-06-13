export class ClientError {
  public status: number;
  public message: string;

  public constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

//"child" client error class
export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(404, `route ${route} not found`);
  }
}

//vacation not found error class
export class VacationNotFoundError extends ClientError {
  public constructor(vacationId: string) {
    super(404, `vacation id:${vacationId} was not found`);
  }
}

//cant get all vacation error
export class cantGetAllVacations extends ClientError {
  public constructor() {
    super(404, `unable to get the vacations from database`);
  }
}
