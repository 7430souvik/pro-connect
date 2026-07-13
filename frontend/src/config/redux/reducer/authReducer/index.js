import { createSlice } from "@reduxjs/toolkit";
import { connection } from "next/server";
import { getAboutUser, getAllUsers, loginUser, registerUser } from "../../action/authAction";
import { register } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";


const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequest: [],
    all_users: [],
    all_profiles_fetched: false
}

const authslice = createSlice({
    name:  "auth",
    initialState,
    reducers:{
        reset: ()=> initialState,
        handleLoginUser: (state) =>{
                state.message ="hello"
        },
        emptyMessage: (state)=>{
            state.message= ""
        },
        setTokenIsThere: (state) => {
            state.isTokenThere = true
        },
        setTokenIsNotThere:(state) => {
            state.isTokenThere = false
        }

    },

    extraReducers: (builder) =>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.isLoading = true,
            state.message = "knocking the door ..."
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state. isSuccess= true;
            state.loggedIn = true;
            state.message= "Login is Successfull"

        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Login failed";
        })
        .addCase(registerUser.pending,(state)=>{
            state.isLoading = true;
            state.message= "Registering you....";

        })
        .addCase(registerUser.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.isError= false;
            state.isSuccess= false;
            state.loggedIn= false;
            state.message= "Registration is successfull, please login";
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Registration failed";
        })
        .addCase(getAboutUser.fulfilled, (state,action)=>{
            console.log("Payload:", action.payload);
            state.isLoading = false;
            state.isError= false;
            state.profileFetched= true;
            state.user= action.payload.user;
            
        })
        .addCase(getAllUsers.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError= false;
            state.all_profiles_fetched= true;
            state.all_users= action.payload.profiles;
        })

    }
})


export const {reset, emptyMessage, setTokenIsThere, setTokenIsNotThere} = authslice.actions;
export default authslice.reducer;