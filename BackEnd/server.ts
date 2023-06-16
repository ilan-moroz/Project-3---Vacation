import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ErrorHandler from "./MiddleWare/routeNotFound";
import config from "./Utils/Config";
import logic from "./Logic/tableLogicMYSQL";
import userRouter from "./Routes/UserRoutes";
import vacationRouter from "./Routes/VacationRoutes";
import fileUpload from "express-fileupload";
import followRouter from "./Routes/FollowRoutes";
import WebSiteErrorHandler from "./MiddleWare/websiteErrors";
import path from "path";

// Create Server
const server = express();

// Handle CORS
server.use(cors());

//How we send the data back
server.use(express.json());

// Where to save the files
server.use(express.static("vacation_photos"));

//enable file uploading
server.use(fileUpload({ createParentPath: true }));

//Parse the body as JSON
server.use(bodyParser.json());

// How to use routes
server.use("/api/v1/vacation/users", userRouter);
server.use("/api/v1/vacation/vacations", vacationRouter);
server.use("/api/v1/vacation/followers", followRouter);

//Create the tables if they not exists
console.log("check if table exists...");
logic.createUsersTable();
logic.createVacationsTable();
logic.createFollowTable();

// Serve static files from the React app
server.use(express.static(path.join(__dirname, "../FrontEnd/build")));

// Catch-all route handler
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/build", "index.html"));
});

// Handle errors (route not found)
server.use("*", ErrorHandler);

// Final error handling middleware
server.use(WebSiteErrorHandler);

// Start the server
server.listen(process.env.PORT || config.WebPort, () => {
  console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
});
