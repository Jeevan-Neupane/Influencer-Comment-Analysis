import { configureStore, } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";

import { userApi } from "./api/userApi";
import { videoApi } from "./api/videoApi";

const store = configureStore({
    reducer: {
        user: userSlice,

        [userApi.reducerPath]: userApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,

    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware().concat(userApi.middleware, videoApi.middleware),
})




export default store;

export * from "./slice/userSlice"
