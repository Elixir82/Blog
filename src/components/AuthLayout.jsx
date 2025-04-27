import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function AuthLayout({children,authentication=true}) {
  let navigate=useNavigate();
  let [loader,setLoader]=useState(true);
  let authStatus=useSelector((state)=>(state.auth.status));
  
  useEffect(()=>{
    if(authentication&&authentication!==authStatus){
      navigate('/login');
    }else if(!authentication&&authentication!==authStatus){
      navigate('/')
    } 
    setLoader(false);
  },[authStatus])
  
  return (loader?(<p>Loading...</p>):<>{children}</>)
  
}

export default AuthLayout;