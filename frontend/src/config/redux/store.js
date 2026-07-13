
/**
 * Steps for sate management
 * Submit Action
 * Handle action in reducer
 * Register Here->reducer
 * 
 * 
 */
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authReducer"
import postReducer from "./reducer/postReducer"

export  const store= configureStore({
    reducer:{
        auth: authReducer,
        postReducer: postReducer,

    }

})