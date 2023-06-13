import { Request, Response, NextFunction } from "express";
import { vacationError } from "../Models/VacationErrors";

const WebSiteErrorHandler = (
  err: vacationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status).send(err.message);
};

export default WebSiteErrorHandler;
