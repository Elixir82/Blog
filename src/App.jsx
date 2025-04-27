import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux' 
import './App.css'
import authservices from './appwrite/auth'
// import store from './store/store'
import { login,logout } from './store/authSlice'
import Header from './components/header'
import Footer from './components/footer'
import { Outlet } from 'react-router-dom'
function App() {
  const [loader, setLoader] = useState(true);
  let dispatch = useDispatch(); 
  useEffect(()=>{
    authservices.getCurrentUser().then((userdata)=>{
      if(userdata){
        dispatch(login(userdata))
      }else dispatch(logout())
    }).finally(setLoader(false));
  },[])

  return !loader? (<div className='min-h-screen  flex flex-wrap bg-gray-400 content-between'>
    <div className='w-full block'>
      <Header/>
      <main>
      <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>):(<div>Fooking Loading Mate</div>)
}

export default App
