import { configureStore } from "@reduxjs/toolkit";
import magentoPageGridReducer from "./magentoPageGridReducer";

const store = configureStore({
  reducer: { magentopage: magentoPageGridReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
