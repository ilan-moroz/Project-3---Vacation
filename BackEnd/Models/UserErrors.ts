import { User } from "./User";
import { vacationError } from "./VacationErrors";

//vacation not found error class
export class UserUploadError extends vacationError {
  public constructor(user: User) {
    super(400, `User: ${JSON.stringify(user)} could not be uploaded`);
  }
}
