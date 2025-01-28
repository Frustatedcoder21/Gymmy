import {createSlice} from '@reduxjs/toolkit'

const initialState={
    isLoggedIn:!!localStorage.getItem('token'),
    token:localStorage.getItem('token')||null,
    type:localStorage.getItem('type')||null
}

const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{            
         state.token=action.payload.token;
         state.type=action.payload.type
          if(state.token){
            state.isLoggedIn=true
          }
        },
        logout:(state)=>{
            localStorage.removeItem('token')
            localStorage.removeItem('type')
            state.token=null;
            state.isLoggedIn=false
            state.type=null
        }
    }
})
export const {login,logout}=authSlice.actions
export default authSlice.reducer