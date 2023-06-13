import express, { NextFunction, Request, Response } from "express";
import logic from "../Logic/followLogicMYSQL";
import WebSiteErrorHandler from "../MiddleWare/websiteErrors";
import {
  AddFollowError,
  GetAllFollowersError,
  RemoveAllFollowersError,
  RemoveFollowError,
} from "../Models/FollowErrors";

const followRouter = express.Router();

// ADD FOLLOW TO VACATION
followRouter.post(
  "/follow/:vacationKey/:userKey",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationKey = +request.params.vacationKey;
      const userKey = +request.params.userKey;
      const result = await logic.addFollower(vacationKey, userKey);
      if (!result) {
        throw new AddFollowError(vacationKey);
      }
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
      if (!result) {
        throw new RemoveFollowError(vacationKey);
      }
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
      if (!result) {
        throw new RemoveAllFollowersError(vacationKey);
      }
      response
        .status(200)
        .json({ message: "Followers removed", result: result });
    } catch (error) {
      next(error);
    }
  }
);

// GET ALL followers
followRouter.get(
  "/allFollowers",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await logic.getAllFollowers();
      if (!result) {
        throw new GetAllFollowersError();
      }
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

// Error handling middleware
followRouter.use(WebSiteErrorHandler);

export default followRouter;
