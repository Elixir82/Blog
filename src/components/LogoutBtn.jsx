import React from 'react'
import {useDispatch} from 'react-redux';
import Authservices from '../appwrite/auth';
import { logout } from '../store/authSlice';
function LogoutBtn() {

  let dispatch=useDispatch();
  let handlesubmit=(e)=>{
    e.preventDefault();
    Authservices.logout().then(()=>{dispatch(logout())})
  }
  return (
    <button onClick={handlesubmit} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn