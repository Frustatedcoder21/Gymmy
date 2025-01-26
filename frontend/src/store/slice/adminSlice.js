import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAdminDetails=createAsyncThunk("fetchAdminDetails",async()=>{
    
    const response=await fetch('http://localhost:4000/api/admin/details',{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    const details=await response.json();
    // console.log(details);
    
    return details
})
const initialState={
    is_loading:false,
    is_error:false,
    adminDetails:null
}
const adminSlice=createSlice({
    name:'admin',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchAdminDetails.pending,(state,action)=>{
            state.is_loading=true
        })
        builder.addCase(fetchAdminDetails.fulfilled,(state,action)=>{
            state.is_loading=false;
            state.is_error=false;
            state.adminDetails=action.payload
        })
        builder.addCase(fetchAdminDetails.rejected,(state,action)=>{
            state.is_loading=false;
            state.is_error=true
        })
    }
})

export default adminSlice.reducer