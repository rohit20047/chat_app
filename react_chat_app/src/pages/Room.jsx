import React, { useEffect } from 'react'
import service from '../appwrite/database'
function Room() {
    useEffect(()=>{
      getMessage()
     },[]);
    
     const getMessage = async ()=>{
       const res =  await service.getMessages();
       console.log(res);
     }

     
  return (
    <div>
     <h1>ROOM </h1> 
    </div>
  )
}

export default Room
