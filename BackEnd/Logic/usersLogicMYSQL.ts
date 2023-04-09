import dalMySQL from '../Utils/dalMySQL'

const createUsersTable = () => {
  const SQLcommand = `
  CREATE TABLE vacation.users (
    userKey INT NOT NULL AUTO_INCREMENT,
    privateName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    email VARCHAR(90) NOT NULL,
    password VARCHAR(45) NOT NULL,
    role VARCHAR(45) NOT NULL,
    PRIMARY KEY (userKey));`
  dalMySQL.execute(SQLcommand)
}
