import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import planSlice from "./slices/planSlice";


export const makeStore = () => configureStore({
  reducer: {
    plans: planSlice
  },
  devTools: true,
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
