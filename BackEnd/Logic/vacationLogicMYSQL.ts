import dalMySQL from "../Utils/dalMySQL";
import { Vacation } from "../Models/Vacation";

// add new vacation
const addVacation = async (newVacation: Vacation) => {
  const SQLcommand = `
      INSERT INTO vacation.Vacations 
      (vacationDestiny, vacationDesc, vacationStart, vacationEnd, price, photoFile)
      VALUES ('${newVacation.vacationDestiny}', '${newVacation.vacationDesc}', 
      '${newVacation.vacationStart}', '${newVacation.vacationEnd}', '${newVacation.price}', '${newVacation.photoFile}');`;
  dalMySQL.execute(SQLcommand);
};

// get all Vacations
const getAllVacations = async () => {
  const SQLcommand = `SELECT * FROM vacation.Vacations`;
  return await dalMySQL.execute(SQLcommand);
};

// delete vacation
const deleteVacation = (key: number) => {
  const SQLcommand = `DELETE FROM vacation.Vacations WHERE vacationKey=${key}`;
  dalMySQL.execute(SQLcommand);
  return true;
};

// get vacation key
const getVacationKey = async (destiny: string) => {
  const SQLcommand = `SELECT vacationKey FROM vacation.Vacations WHERE vacationDestiny = '${destiny}';`;
  const key = await dalMySQL.execute(SQLcommand);
  return key;
};

// CHECK IF EMAIL EXISTS IN DATABASE FOR REGISTER
const checkDestiny = async (destiny: string): Promise<boolean> => {
  const SQLcommand = `SELECT COUNT(*) AS count FROM vacation.vacations WHERE vacationDestiny = '${destiny}';`;
  const result = await dalMySQL.execute(SQLcommand);
  return result[0].count > 0;
};

export default {
  addVacation,
  getAllVacations,
  deleteVacation,
  getVacationKey,
  checkDestiny,
};
