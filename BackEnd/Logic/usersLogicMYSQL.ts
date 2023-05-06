import { User } from '../Models/User'
import dalMySQL from '../Utils/dalMySQL'

// ADD NEW USER AFTER REGISTER
const addUser = async (newUser: User) => {
  const SQLcommand = `
    INSERT INTO vacation.users 
    (firstName, lastName, email, password, admin)
    VALUES ('${newUser.firstName}', '${newUser.lastName}', 
    '${newUser.email}', '${newUser.password}', '${newUser.admin}');`
  dalMySQL.execute(SQLcommand)
}

// CHECK IF EMAIL EXISTS IN DATABASE
const checkEmail = async (email: string): Promise<boolean> => {
  const SQLcommand = `SELECT COUNT(*) AS count FROM vacation.users WHERE email = '${email}';`
  const result = await dalMySQL.execute(SQLcommand)
  return result[0].count > 0
}

export default {
  addUser,
  checkEmail
}
