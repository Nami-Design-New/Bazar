import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/language";
import authedUserReducer from "./slices/authedUser";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    authedUser: authedUserReducer,
  },
});
