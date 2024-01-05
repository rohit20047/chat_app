import React from 'react'
import Room from './pages/Room'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignUpPage'
import { useState } from 'react'
import { authService } from './appwrite/auth'
import { login } from './store/authSlice'
//import { useDispatch } from '@reduxjs/toolkit'
function App() {

  // const [loading , setLoading] = useState(true);
  // const dispatch = useDispatch();


  // useEffect(()=>{
  //   authService.getCurrentUser()
  //   .then((userData)=>{
  //     if(userData){
  //       dispatch(login({userData}))
  //     }
  //     else{
  //       dispatch(logout())
  //     }
  //   })
  //   .finally(()=>setLoading(false))
  // },[])

  return (
     
    <Room/>
    
    
    
  ) 
  }

export default App
