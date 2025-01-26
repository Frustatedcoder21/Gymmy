import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchDetails=createAsyncThunk("fetchDetails",async()=>{
    const response=await fetch("http://localhost:4000/api/user/details",{
        method:'GET',
        headers:{
            token:localStorage.getItem('token')
        }
    })
    const data=await response.json();
    
    return data;
})
const initialState={
    isLoading:false,
    isError:false,
    data:null
}
const userSlice=createSlice({
    name:"user",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchDetails.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(fetchDetails.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.data=action.payload;
        })
        builder.addCase(fetchDetails.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
        })
    }
})
export default userSlice.reducer