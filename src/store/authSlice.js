import { createSlice } from "@reduxjs/toolkit";

let initialState={
  status:false,
  userdata:null
}

let AuthSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    login:(state,action)=>{
      state.status=true;
      state.userdata=action.payload.userdata;
    },
    logout:(state)=>{
      state.status=false;
      state.userdata=null;
    }
  }
})
export let {login,logout} = AuthSlice.actions;
export default AuthSlice.reducer;