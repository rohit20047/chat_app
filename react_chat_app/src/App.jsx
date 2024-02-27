import React from 'react'
import { useState } from 'react'
import { authService } from './appwrite/auth'
import { login } from './store/authSlice'
import {Navigate, Outlet} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect  } from 'react'
import SignupPage from './pages/SignUpPage'
function App() {

  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch()
  
   
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
       
        dispatch(login({userData}))
       
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ?  (
     
 <Outlet />
  ) : null
 
}

export default App
