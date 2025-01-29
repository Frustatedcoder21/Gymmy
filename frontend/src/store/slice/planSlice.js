import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPlan=createAsyncThunk('fetchPlan',async()=>{
    const response=await fetch('http://localhost:4000/api/user/plan/details');
    const data=await response.json();
    
    return data
})
const initialState={
    is_Loading:false,
    is_Error:false,
    plan_data:null
}
const planSlice=createSlice({
    name:'plan',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchPlan.fulfilled,(state,action)=>{
            state.plan_data=action.payload;
            state.is_Error=false  ;
            state.is_Loading=false          
        })
        builder.addCase(fetchPlan.rejected,(state,action)=>{
            state.is_Error=true;
            state.is_Loading=false;
        })
        builder.addCase(fetchPlan.pending,(state,action)=>{
            state.is_Loading=true;
        })
    }
})
export default planSlice.reducer