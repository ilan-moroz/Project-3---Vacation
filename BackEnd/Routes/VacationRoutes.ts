import express, { NextFunction, Request, Response } from "express";
import logic from "../Logic/vacationLogicMYSQL";

const vacationRouter = express.Router();

// ADD NEW Vacation
vacationRouter.post(
  "/newVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const newVacation = request.body;
    console.log(newVacation);
    response.status(201).json(await logic.addVacation(newVacation));
  }
);

// TEST ROUTE
vacationRouter.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("Controller working !!!");
  }
);

export default vacationRouter;
