import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./UserReducer";

//choose all reducers....
const reducers = { users: UserReducer };

//combine reducers.
export const vacation = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }), //do not look on serialization errors
});
