import { Request, Response, NextFunction } from "express";
import { ClientError } from "../Models/VacationErrors";

const VacationErrorHandler = (
  err: ClientError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status).send(err.message);
};

export default VacationErrorHandler;
