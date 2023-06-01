import express, { NextFunction, Request, Response } from "express";
import logic from "../Logic/followLogicMYSQL";

const followRouter = express.Router();

// ADD FOLLOW TO VACATION
followRouter.post(
  "/follow/:vacationKey/:userKey",
  (request: Request, response: Response, next: NextFunction) => {
    const vacationKey = +request.params.vacationKey;
    const userKey = +request.params.userKey;
    response.status(201).json(logic.addFollower(vacationKey, userKey));
  }
);

// REMOVE FOLLOW FROM VACATION
followRouter.delete(
  "/removeFollow/:vacationKey/:userKey",
  (request: Request, response: Response, next: NextFunction) => {
    const vacationKey = +request.params.vacationKey;
    const userKey = +request.params.userKey;
    response.status(204).json(logic.removeFollower(vacationKey, userKey));
  }
);

export default followRouter;
