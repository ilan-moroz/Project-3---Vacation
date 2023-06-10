import express, { NextFunction, Request, Response } from "express";
import logic from "../Logic/followLogicMYSQL";

const followRouter = express.Router();

// ADD FOLLOW TO VACATION
followRouter.post(
  "/follow/:vacationKey/:userKey",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationKey = +request.params.vacationKey;
      const userKey = +request.params.userKey;
      const result = await logic.addFollower(vacationKey, userKey);
      response.status(201).json({ message: "Follow added", result: result });
    } catch (err) {
      next(err);
    }
  }
);

// REMOVE FOLLOW FROM VACATION
followRouter.delete(
  "/removeFollow/:vacationKey/:userKey",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationKey = +request.params.vacationKey;
    const userKey = +request.params.userKey;
    try {
      const result = await logic.removeFollower(vacationKey, userKey);
      response.status(200).json({ message: "Follow removed", result: result });
    } catch (error) {
      next(error);
    }
  }
);

// REMOVE ALL FOLLOWER WHEN VACATION REMOVED
followRouter.delete(
  "/removeAllFollowers/:vacationKey",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationKey = +request.params.vacationKey;
    try {
      const result = await logic.removeAllFollowers(vacationKey);
      response.status(200).json({ message: "Follow removed", result: result });
    } catch (error) {
      next(error);
    }
  }
);

// GET ALL followers
followRouter.get(
  "/allFollowers",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await logic.getAllFollowers());
  }
);

export default followRouter;
