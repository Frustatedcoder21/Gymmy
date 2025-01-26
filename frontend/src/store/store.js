import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import userReducer from './slice/userSlice'
import planReducer from './slice/planSlice'
import adminReducer from './slice/adminSlice'
const store=configureStore({
    reducer:{
   auth:authReducer,
   user:userReducer,
   plan:planReducer,
   admin:adminReducer
    }
})

export default store;