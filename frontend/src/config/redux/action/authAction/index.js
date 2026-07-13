import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";




export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        try {
            const payload = {
                username: user.username,
                password: user.password,
                email: user.email,
                name: user.name,
            };

            console.log("Payload:", payload);

            const response = await clientServer.post("/register", payload);

            return response.data;
        } catch (error) {
            console.log(error.response?.data);
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);



export const loginUser = createAsyncThunk(
    "user/login",
    async(user, thunkAPI) =>{
        try{

            const response= await clientServer.post("/login",{
                email:user.email,
                password:user.password  
            });

            if(response.data.token){
                localStorage.setItem("token", response.data.token);

            }
            else{
                return thunkAPI.rejectWithValue({
                    message: "token not provided"
                })
            }

            return thunkAPI.fulfillWithValue(response.data.token);
            

            


        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)

export const getAboutUser= createAsyncThunk(
    "user/getAboutUser",
    async (user, thunkAPI) =>{
        try{
            const response= await clientServer.get("/get_user_and_profile",{
                params: {
                    token: user.token
                }
            });

            console.log(response.data);
            return response.data;

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)

export const getAllUsers= createAsyncThunk(
    "user/getAllUsers",
    async(_, thunkAPI) =>{
        try{
            const response= await clientServer.get("/user/get_all_users")

            return thunkAPI.fulfillWithValue(response.data);

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data)

        }
    }
)