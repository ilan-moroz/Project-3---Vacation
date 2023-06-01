import dalMySQL from "../Utils/dalMySQL";

// add follow to vacation
const addFollower = (userKey: number, vacationKey: number) => {
  const SQLcommand = `
    INSERT INTO vacation.follow
    (userKey, vacationKey)
    VALUES ('${userKey}', '${vacationKey}')`;
  dalMySQL.execute(SQLcommand);
};

// remove follow from vacation
const removeFollower = (userKey: number, vacationKey: number) => {
  const SQLcommand = `DELETE FROM vacation.follow WHERE vacationKey=${vacationKey} and userKey=${userKey}`;
  return dalMySQL.execute(SQLcommand);
};

export default {
  addFollower,
  removeFollower,
};
