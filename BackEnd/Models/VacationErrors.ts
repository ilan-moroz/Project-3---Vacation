import { Vacation } from "./Vacation";

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
export class GetAllVacationsError extends ClientError {
  public constructor() {
    super(404, `unable to get the vacations from database`);
  }
}

//vacation not found error class
export class VacationUploadError extends ClientError {
  public constructor(vacation: Vacation) {
    super(400, `Vacation could not be uploaded: ${JSON.stringify(vacation)}`);
  }
}

// image upload error class
export class NoFilesUploadedError extends ClientError {
  public constructor() {
    super(400, "No files were uploaded");
  }
}
// image upload error class
export class FileUploadFailedError extends ClientError {
  public constructor(errorMessage: string) {
    super(500, `File upload failed: ${errorMessage}`);
  }
}

// image delete error class
export class DeleteImageError extends ClientError {
  public constructor(image: string) {
    super(500, `Error when deleting the image: ${image}`);
  }
}

// vacation delete error class
export class VacationDeleteError extends ClientError {
  public constructor(vacationKey: number) {
    super(
      500,
      `Error when deleting the the vacation with the key: ${vacationKey}`
    );
  }
}
