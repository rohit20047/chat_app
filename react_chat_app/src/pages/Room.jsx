import React, { useEffect , useState} from 'react'
import service from '../appwrite/database'
import {Trash2} from 'react-feather'
import { authService } from '../appwrite/auth';
import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';
import { Navigate } from 'react-router-dom';
function Room() {
    


  
    
  const authStatus = useSelector(state => state.auth.status)

     let [messages , setMessages] = useState([]);
     let [messageBody , setMessageBody] = useState('');
   
     
     
     useEffect(()=>{
      getMessages()
      
      const unsubscribe = authService.subscribeToDocuments(respond => {
        //console.log("ressss", respond);

        if(respond.events.includes("databases.*.collections.*.documents.*.create")){
            // console.log("created",respond)
            if(messages.length < 24){
         setMessages(prevMessages=>[ ...prevMessages , respond.payload])
        //  let el = messages.shift().$id
        //  console.log("aftereeee" ,el)
            }
            else {
              let g = messages.shift().$id
              console.log("message deleted ",g)
               //  service.deleteMessage(messages[0].$id)
               deleteMessage(g)
                setMessages(prevMessages=>[ ...prevMessages , respond.payload])

            }
        }
        if(respond.events.includes("databases.*.collections.*.documents.*.delete")){
          console.log("deleted")
          setMessages(prev => messages.filter(message => message.$id !== respond.payload.$id));
          getMessages();
      }
      });

      return () => {
        // Unsubscribe when the component is about to unmount
        unsubscribe();
      };
     },[]);




     const getMessages = async ()=>{
       const res =  await service.getMessages();
       console.log("get messages" , res.documents)
        setMessages(res.documents)
        //console.log(res.documents)
     }
     const deleteMessage = async (message_id)=>{
      console.log(message_id)
         service.deleteMessage(message_id);
         //setMessages(prev => messages.filter(message => message.$id !== message_id));
     }




     const handleSubmit = async (e) => {
      e.preventDefault();
      let payload = {
        body: messageBody,
      };
    
      try {
        let res = await service.createMessage(payload);
        setMessageBody('');
      } catch (error) {
        console.error('Error creating message:', error);
      }
    };
    
    if(authStatus == false){
     return <Navigate to = "/signup"/>
    }
   
    


     
  return (
    <div style={{ position: 'relative' }}>
     <h1>ROOM </h1> 
     
    

     { messages.map((message)=>(<div key = {message.$id}>
      <p>{new Date(message.$createdAt).toLocaleString()}</p>
      {message.body} <Trash2 onClick={()=>(deleteMessage(message.$id))}/>
      <hr/>
     </div>))

     }

<form style={{ position: 'sticky', bottom: '0', zIndex: '1', backgroundColor: 'white' }} onSubmit={handleSubmit}>
  
<div >
  <textarea
    required 
    maxLength="1000"
    placeholder="Say something..."
    onChange={(e) => { setMessageBody(e.target.value) }}
    value={messageBody}
    
  ></textarea>
  </div>
        <input type="submit" value="Send"/>
        
     </form>
    </div>
    
  )
}

export default Room
