import dalMySQL from "../Utils/dalMySQL";

// add follow to vacation
const addFollower = async (userKey: number, vacationKey: number) => {
  const SQLcommand = `
    INSERT INTO vacation.follow
    (userKey, vacationKey)
    VALUES ('${userKey}', '${vacationKey}')`;
  return await dalMySQL.execute(SQLcommand);
};

// remove follow from vacation
const removeFollower = async (userKey: number, vacationKey: number) => {
  const SQLcommand = `DELETE FROM vacation.follow WHERE userKey=${userKey} AND vacationKey=${vacationKey} `;
  await dalMySQL.execute(SQLcommand);
};

export default {
  addFollower,
  removeFollower,
};
