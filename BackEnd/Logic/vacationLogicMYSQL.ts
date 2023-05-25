import dalMySQL from "../Utils/dalMySQL";
import { Vacation } from "../Models/Vacation";

const addVacation = async (newVacation: Vacation) => {
  const SQLcommand = `
      INSERT INTO vacation.Vacations 
      (vacationDestiny, vacationDesc, vacationStart, vacationEnd, price, photoFile)
      VALUES ('${newVacation.vacationDestiny}', '${newVacation.vacationDesc}', 
      '${newVacation.vacationStart}', '${newVacation.vacationEnd}', '${newVacation.price}', '${newVacation.photoFile}');`;
  dalMySQL.execute(SQLcommand);
};

const getAllVacations = async () => {
  const SQLcommand = `SELECT * FROM vacation.Vacations`;
  return await dalMySQL.execute(SQLcommand);
};

const deleteVacation = (key: number) => {
  const SQLcommand = `DELETE FROM vacation.Vacations WHERE vacationKey=${key}`;
  dalMySQL.execute(SQLcommand);
  return true;
};

const getVacationKey = async (destiny: string) => {
  const SQLcommand = `SELECT vacationKey FROM vacation.Vacations WHERE vacationDestiny = '${destiny}';`;
  const key = await dalMySQL.execute(SQLcommand);
  return key;
};

export default {
  addVacation,
  getAllVacations,
  deleteVacation,
  getVacationKey,
};
