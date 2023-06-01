import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./UserReducer";
import { VacationReducer } from "./VacationReducer";
import { FollowReducer } from "./FollowReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, UserReducer);
const persistedVacationReducer = persistReducer(persistConfig, VacationReducer);
const persistedFollowReducer = persistReducer(persistConfig, FollowReducer);

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
