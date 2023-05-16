import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./UserReducer";
import { VacationReducer } from "./VacationReducer";

//choose all reducers....
const reducers = { users: UserReducer, vacations: VacationReducer };

//combine reducers.
export const vacation = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }), //do not look on serialization errors
});
