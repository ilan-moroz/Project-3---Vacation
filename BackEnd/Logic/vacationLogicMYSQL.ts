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

// get single Vacation
const getSingleVacation = async (vacationKey: number): Promise<Vacation> => {
  const SQLcommand = `SELECT * FROM vacation.Vacations WHERE vacationKey=${vacationKey}`;
  const singleVacation = await dalMySQL.execute(SQLcommand);
  return singleVacation[0];
};

// delete vacation
const deleteVacation = (key: number) => {
  const SQLcommand = `DELETE FROM vacation.Vacations WHERE vacationKey=${key}`;
  dalMySQL.execute(SQLcommand);
  return true;
};

// get vacation key
const getVacationKey = async (destiny: string): Promise<number> => {
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

// NOT WORKING YET!!!!!!!!
const updateVacation = async (
  vacationKey: number,
  updatedVacation: Vacation
): Promise<void> => {
  // get the current vacation data for comparison
  const currentVacation: Vacation = await getSingleVacation(vacationKey); // Implement this function to fetch current data
  // all the updated values will be stored here
  let updatedValues = [];
  let SQLcommand = `UPDATE vacation.Vacations SET `;
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

  await dalMySQL.execute(SQLcommand);
};

export default {
  addVacation,
  getAllVacations,
  deleteVacation,
  getVacationKey,
  checkDestiny,
  updateVacation,
  getSingleVacation,
};
