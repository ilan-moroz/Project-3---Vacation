import express, { NextFunction, Request, Response } from "express";
import logic from "../Logic/vacationLogicMYSQL";
import { UploadedFile } from "express-fileupload";
import fs from "fs";

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

// check if destination exists in database
vacationRouter.get(
  "/checkDestination/:destiny",
  async (request: Request, response: Response, next: NextFunction) => {
    const destiny = request.params.destiny;
    response.status(200).json(await logic.checkDestiny(destiny));
  }
);

// GET ALL VACATIONS
vacationRouter.get(
  "/allVacations",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await logic.getAllVacations());
  }
);

// get single VACATION
vacationRouter.get(
  "/singleVacation/:vacationKey",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationKey = +request.params.vacationKey;
    response.status(200).json(await logic.getSingleVacation(vacationKey));
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
    uploadPath = "./vacation_photos/" + sampleFile.name;
    sampleFile.mv(uploadPath, function (err: any) {
      if (err) return response.status(500).send(err);
      console.log("File saved at:", uploadPath); // Log the file path
      response.send("File uploaded!");
    });
  }
);

// delete image when deleting a vacation
vacationRouter.delete(
  "/deleteImage/:image",
  async (request: Request, response: Response, next: NextFunction) => {
    const imageName = request.params.image;
    fs.unlink(`./vacation_photos/${imageName}`, (err: any) => {
      if (err) {
        console.error("Error when deleting the image: ", err);
        response.status(500).send("There was an error deleting the image");
      } else {
        response.send("Image successfully deleted");
      }
    });
  }
);

//delete vacation by key
vacationRouter.delete(
  "/delete/:key",
  async (request: Request, response: Response, next: NextFunction) => {
    const key = +request.params.key;
    logic.deleteVacation(key);
    response.status(204).json();
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

// TEST ROUTE
vacationRouter.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("Controller working !!!");
  }
);

export default vacationRouter;
