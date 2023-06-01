import dalMySQL from "../Utils/dalMySQL";

const addFollower = (userKey: number, vacationKey: number) => {
  const SQLcommand = `
    INSERT INTO vacation.follow
    (userKey, vacationKey)
    VALUES ('${userKey}', '${vacationKey}')`;
  dalMySQL.execute(SQLcommand);
};

export default {
  addFollower,
};
