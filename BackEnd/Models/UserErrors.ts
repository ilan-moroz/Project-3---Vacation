import { User } from "./User";
import { vacationError } from "./VacationErrors";

//user upload error class
export class UserUploadError extends vacationError {
  public constructor(user: User) {
    super(400, `User: ${JSON.stringify(user)} could not be uploaded`);
  }
}

// email don't exist error class
export class EmailError extends vacationError {
  public constructor(email: string) {
    super(400, `Email: ${email} does not exist`);
  }
}

// email or password exist error class
export class EmailPasswordError extends vacationError {
  public constructor(email: string, password: string) {
    super(400, `Email: ${email} or ${password} does not exist`);
  }
}

// first and last name error class
export class FirstLastNameError extends vacationError {
  public constructor() {
    super(400, `User was not found`);
  }
}
