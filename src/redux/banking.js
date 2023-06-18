import { configureStore } from "@reduxjs/toolkit";
import { bankReducer } from "./slice";

export const bank = configureStore({
    reducer: {
        bankState: bankReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});