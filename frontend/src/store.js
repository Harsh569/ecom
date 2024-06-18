import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import  CartSliceReducer  from "./slices/CartSlice";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart: CartSliceReducer,
        auth: authSliceReducer,

    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;