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

export default {
  addVacation,
  getAllVacations,
};
