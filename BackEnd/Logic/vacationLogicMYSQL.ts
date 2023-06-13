import { VacationWithKey } from "../Models/VacationWithKey";
import dalMySQL from "../Utils/dalMySQL";
import { Vacation } from "../Models/Vacation";

// add new vacation
const addVacation = async (newVacation: Vacation) => {
  // prevent crush when using single quotes
  const VacationDesc = newVacation.vacationDesc.replace(/'/g, "''");
  const SQLcommand = `
      INSERT INTO vacation.vacations 
      (vacationDestiny, vacationDesc, vacationStart, vacationEnd, price, photoFile)
      VALUES ('${newVacation.vacationDestiny}', '${VacationDesc}', 
      '${newVacation.vacationStart}', '${newVacation.vacationEnd}', '${newVacation.price}', '${newVacation.photoFile}');`;
  return await dalMySQL.execute(SQLcommand);
};

// get all Vacations
const getAllVacations = async (): Promise<VacationWithKey> => {
  const SQLcommand = `SELECT * FROM vacation.vacations`;
  return await dalMySQL.execute(SQLcommand);
};

// get single Vacation
const getSingleVacation = async (vacationKey: number): Promise<Vacation> => {
  const SQLcommand = `SELECT * FROM vacation.vacations WHERE vacationKey=${vacationKey}`;
  const singleVacation = await dalMySQL.execute(SQLcommand);
  return singleVacation[0];
};

// delete vacation
const deleteVacation = (key: number): Promise<boolean> => {
  const SQLcommand = `DELETE FROM vacation.vacations WHERE vacationKey=${key}`;
  return dalMySQL.execute(SQLcommand);
};

// NOT WORKING YET!!!!!!!!
const updateVacation = async (
  vacationKey: number,
  updatedVacation: Vacation
): Promise<boolean> => {
  // get the current vacation data for comparison
  const currentVacation: Vacation = await getSingleVacation(vacationKey); // Implement this function to fetch current data
  // all the updated values will be stored here
  let updatedValues: any = [];
  let SQLcommand = `UPDATE vacation.vacations SET `;
  // check what values changed and push the changed ones to the array
  if (updatedVacation.vacationDestiny !== currentVacation.vacationDestiny) {
    updatedValues.push(
      `vacationDestiny = '${updatedVacation.vacationDestiny}'`
    );
  }
  if (updatedVacation.vacationDesc !== currentVacation.vacationDesc) {
    updatedValues.push(`vacationDesc = '${updatedVacation.vacationDesc}'`);
  }
  if (updatedVacation.vacationStart !== currentVacation.vacationStart) {
    updatedValues.push(`vacationStart = '${updatedVacation.vacationStart}'`);
  }
  if (updatedVacation.vacationEnd !== currentVacation.vacationEnd) {
    updatedValues.push(`vacationEnd = '${updatedVacation.vacationEnd}'`);
  }
  if (updatedVacation.price !== currentVacation.price) {
    updatedValues.push(`price = '${updatedVacation.price}'`);
  }
  if (updatedVacation.photoFile !== currentVacation.photoFile) {
    updatedValues.push(`photoFile = '${updatedVacation.photoFile}'`);
  }
  SQLcommand += updatedValues.join(", ");
  SQLcommand += ` WHERE vacationKey = ${vacationKey};`;
  return await dalMySQL.execute(SQLcommand);
};

export default {
  addVacation,
  getAllVacations,
  deleteVacation,
  updateVacation,
  getSingleVacation,
};
