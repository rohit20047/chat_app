import React, { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { authService } from '../appwrite/auth';


export default function Header() {
    const [userData , setUserData] = useState(null)
    useEffect(()=>{
         
         authService.getCurrentUser()
    .then((userData)=>{
       // console.log(userData)
        setUserData(userData)
      if(userData){
        const name = userData.name
      }
    })
},[])
//setUserData(useSelector((state) => state.auth.userData) );
    
  return (
    
    <div>
    {userData && (
      <p>
        Welcome, {userData.name}
      </p>
    )}
    {!userData && <p>You are not logged in.</p>}
  </div>
  )
}
