import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/language";
import authedUserReducer from "./slices/authedUser";
import cartReducer from "./slices/cart";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    authedUser: authedUserReducer,
    cart: cartReducer,
  },
});
