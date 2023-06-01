import { User } from "../Models/User";
import dalMySQL from "../Utils/dalMySQL";

// ADD NEW USER AFTER REGISTER
const addUser = async (newUser: User) => {
  const SQLcommand = `
    INSERT INTO vacation.users 
    (firstName, lastName, email, password, role)
    VALUES ('${newUser.firstName}', '${newUser.lastName}', 
    '${newUser.email}', '${newUser.password}', '${newUser.role}');`;
  return await dalMySQL.execute(SQLcommand);
};

// CHECK IF EMAIL EXISTS IN DATABASE FOR REGISTER
const checkEmail = async (email: string): Promise<boolean> => {
  const SQLcommand = `SELECT COUNT(*) AS count FROM vacation.users WHERE email = '${email}';`;
  const result = await dalMySQL.execute(SQLcommand);
  return result[0].count > 0;
};

// CHECK IF EMAIL AND PASSWORD EXISTS IN DATABASE FOR LOGIN
const checkUser = async (email: string, password: string): Promise<boolean> => {
  const SQLcommand = `SELECT COUNT(*) AS count FROM vacation.users WHERE email = '${email}' AND password = '${password}';`;
  const result = await dalMySQL.execute(SQLcommand);
  return result[0].count > 0;
};

const getFirstLastName = async (email: string): Promise<string> => {
  const SQLcommand = `SELECT firstName, lastName, role,userKey FROM vacation.users WHERE email = '${email}';`;
  const result = await dalMySQL.execute(SQLcommand);
  return result[0] || null;
};

export default {
  addUser,
  checkEmail,
  checkUser,
  getFirstLastName,
};
