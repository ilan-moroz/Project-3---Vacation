import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./UserReducer";
import { VacationReducer } from "./VacationReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, UserReducer);
const persistedVacationReducer = persistReducer(persistConfig, VacationReducer);

const reducers = {
  users: persistedUserReducer,
  vacations: persistedVacationReducer,
};

const vacation = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
  }),
});

let persistor = persistStore(vacation);

export { vacation, persistor };
