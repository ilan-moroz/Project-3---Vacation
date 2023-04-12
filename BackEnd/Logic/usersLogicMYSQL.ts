import { User } from '../Models/User'
import dalMySQL from '../Utils/dalMySQL'
import { OkPacket } from 'mysql'

const addUser = async (newUser: User) => {
  const SQLcommand = `
    INSERT INTO vacation.users 
    (firstName, lastName, email, password, admin)
    VALUES ('${newUser.firstName}', '${newUser.lastName}', 
    '${newUser.email}', '${newUser.password}', '${newUser.admin}');`
  const result: OkPacket = await dalMySQL.execute(SQLcommand)
  return result
}

export default {
  addUser,
}
