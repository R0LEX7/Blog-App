import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import postReducer from "./postsSlice"


const store = configureStore({
    reducer : { 
        auth : authReducer,
        posts : postReducer,
    },
});


export default store;
