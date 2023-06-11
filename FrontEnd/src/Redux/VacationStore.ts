import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./UserReducer";
import { VacationReducer } from "./VacationReducer";
import { FollowReducer } from "./FollowReducer";

const userPersistConfig = {
  key: "users",
  storage,
};

const vacationPersistConfig = {
  key: "vacations",
  storage,
};

const followerPersistConfig = {
  key: "follower",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, UserReducer);
const persistedVacationReducer = persistReducer(
  vacationPersistConfig,
  VacationReducer
);
const persistedFollowReducer = persistReducer(
  followerPersistConfig,
  FollowReducer
);

const reducers = {
  users: persistedUserReducer,
  vacations: persistedVacationReducer,
  follower: persistedFollowReducer,
};

const vacation = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
  }),
});

let persistor = persistStore(vacation);

export type RootState = ReturnType<typeof vacation.getState>;

export { vacation, persistor };
