import dalMySQL from "../Utils/dalMySQL";

// CREATE USERS TABLE IF NOT EXISTS
const createUsersTable = () => {
  const SQLcommand = `
  CREATE TABLE IF NOT EXISTS vacation.users (
    userKey INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    role VARCHAR(45) NOT NULL,
    PRIMARY KEY (userkey));`;
  dalMySQL.execute(SQLcommand);
};

// CREATE VACATIONS TABLE IF NOT EXISTS
const createVacationsTable = () => {
  const SQLcommand = `
  CREATE TABLE IF NOT EXISTS vacation.vacations (
    vacationKey INT NOT NULL AUTO_INCREMENT,
    vacationDestiny VARCHAR(45) NOT NULL,
    vacationDesc VARCHAR(400) NOT NULL,
    vacationStart VARCHAR(45) NOT NULL,
    vacationEnd VARCHAR(45) NOT NULL,
    price INT NOT NULL,
    photoFile VARCHAR(90) NOT NULL,
    PRIMARY KEY (vacationKey));`;
  dalMySQL.execute(SQLcommand);
};

// CREATE  FOLLOWING TABLE IF NOT EXISTS
const createFollowTable = () => {
  const SQLcommand = `
  CREATE TABLE IF NOT EXISTS vacation.follow (
  userKey INT NOT NULL,
  vacationKey INT NOT NULL,
  FOREIGN KEY (userKey) REFERENCES vacation.users(userKey),
  FOREIGN KEY (vacationKey) REFERENCES vacation.vacations(vacationKey)
  );`;
  dalMySQL.execute(SQLcommand);
};

export default {
  createUsersTable,
  createVacationsTable,
  createFollowTable,
};
