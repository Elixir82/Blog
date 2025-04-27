import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './authSlice'; 
let Store=configureStore({
  reducer:{
    auth: AuthSlice,
  }
})
export default Store