import express, { NextFunction, Request, Response } from "express";
import logic from "../Logic/vacationLogicMYSQL";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import {
  DeleteImageError,
  FileUploadFailedError,
  GetAllVacationsError,
  NoFilesUploadedError,
  VacationDeleteError,
  VacationNotFoundError,
  VacationUploadError,
} from "../Models/VacationErrors";
import WebSiteErrorHandler from "../MiddleWare/websiteErrors";

const vacationRouter = express.Router();

// ADD NEW Vacation
vacationRouter.post(
  "/newVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newVacation = request.body;
      const uploadedVacation = await logic.addVacation(newVacation);
      if (!uploadedVacation) {
        throw new VacationUploadError(newVacation);
      }
      response.status(201).json(uploadedVacation);
    } catch (error) {
      next(error);
    }
  }
);

// GET ALL VACATIONS
vacationRouter.get(
  "/allVacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await logic.getAllVacations();
      if (!vacations) {
        throw new GetAllVacationsError();
      }
      response.status(200).json(vacations);
    } catch (error) {
      next(error);
    }
  }
);

// get single VACATION
vacationRouter.get(
  "/singleVacation/:vacationKey",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationKey = +request.params.vacationKey;
      const vacation = await logic.getSingleVacation(vacationKey);
      if (!vacation) {
        throw new VacationNotFoundError(request.params.vacationKey);
      }
      response.status(200).json(vacation);
    } catch (error) {
      next(error);
    }
  }
);

// UPLOAD IMAGE
vacationRouter.post(
  "/uploadImage",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let sampleFile: UploadedFile;
      let uploadPath: string;
      if (!request.files || Object.keys(request.files).length === 0) {
        throw new NoFilesUploadedError();
      }
      sampleFile = request.files.sampleFile as UploadedFile;
      uploadPath = "./vacation_photos/" + sampleFile.name;
      sampleFile.mv(uploadPath, function (err: any) {
        if (err) {
          throw new FileUploadFailedError(err);
        }
        console.log("File saved at:", uploadPath); // Log the file path
        response.send("File uploaded!");
      });
    } catch (error) {
      next(error);
    }
  }
);

// delete image when deleting a vacation
vacationRouter.delete(
  "/deleteImage/:image",
  async (request: Request, response: Response, next: NextFunction) => {
    const imageName = request.params.image;
    try {
      fs.unlinkSync(`./vacation_photos/${imageName}`);
      response.send("Image successfully deleted");
    } catch (err) {
      next(new DeleteImageError(imageName));
    }
  }
);

//delete vacation by key
vacationRouter.delete(
  "/delete/:key",
  async (request: Request, response: Response, next: NextFunction) => {
    const key = +request.params.key;
    try {
      // check if the key exists
      const exists = await logic.getSingleVacation(key);
      if (!exists) {
        response.status(404).json(`Vacation with key: ${key} does not exist`);
        return;
      }
      const result = await logic.deleteVacation(key);
      if (!result) {
        throw new VacationDeleteError(key);
      }
      response
        .status(200)
        .json(`Vacation with key: ${key} successfully deleted`);
    } catch (error) {
      next(error);
    }
  }
);

// edit vacation
vacationRouter.put(
  "/editVacation/:vacationKey",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationKey = +request.params.vacationKey;
    const updateVacation = request.body;
    try {
      const updatedVacation = await logic.updateVacation(
        vacationKey,
        updateVacation
      );
      response.status(200).json(updatedVacation);
    } catch (error) {
      next(error);
    }
  }
);

// Error handling middleware
vacationRouter.use(WebSiteErrorHandler);

// TEST ROUTE
vacationRouter.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("Controller working !!!");
  }
);

export default vacationRouter;
