import { User } from "./User";
import { vacationError } from "./VacationErrors";

//user upload error class
export class UserUploadError extends vacationError {
  public constructor(user: User) {
    super(400, `User: ${JSON.stringify(user)} could not be uploaded`);
  }
}

// first and last name error class
export class FirstLastNameError extends vacationError {
  public constructor() {
    super(404, `User was not found`);
  }
}
