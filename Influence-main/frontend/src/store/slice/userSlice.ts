import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: null,
    user: null,
    status: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;


        },
        removeToken: (state) => {
            state.token = null;

        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.status = true;
        },
        removeUser: (state) => {
            state.user = null;
            state.status = false;
        }


    }
});


export const { setToken, setUser, removeToken, removeUser } = userSlice.actions;
export default userSlice.reducer;