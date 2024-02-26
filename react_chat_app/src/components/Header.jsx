import React, { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { authService } from '../appwrite/auth';
import { Moon } from 'react-feather';


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
    {userData && (<div className="flex flex-row items-center ">
      <Moon  className="text-yellow-400 size-10"/>
      <p className=" font-bold text-yellow-400 px-2" style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}}>
       What's up  
      </p>
      <p className="text-4xl text-yellow-400 size-10" style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}} > {` ${userData.name}`}</p>
     
    </div>
    )}
    {!userData && <p>plz press logout button</p>}
  </div>
  )
}
