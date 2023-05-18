import express, { NextFunction, Request, Response } from "express";
import logic from "../Logic/vacationLogicMYSQL";
import { UploadedFile } from "express-fileupload";

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

// GET ALL VACATIONS
vacationRouter.get(
  "/allVacations",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await logic.getAllVacations());
  }
);

// UPLOAD IMAGE
vacationRouter.post(
  "/uploadImage",
  async (request: Request, response: Response, next: NextFunction) => {
    let sampleFile: UploadedFile;
    let uploadPath: string;
    if (!request.files || Object.keys(request.files).length === 0) {
      return response.status(400).send("No files were uploaded.");
    }
    sampleFile = request.files.sampleFile as UploadedFile;
    uploadPath = "BackEnd/vacation_photos/" + sampleFile.name;
    sampleFile.mv(uploadPath, function (err: any) {
      if (err) return response.status(500).send(err);
      response.send("File uploaded!");
    });
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
