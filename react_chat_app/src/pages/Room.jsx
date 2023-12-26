import React, { useEffect , useState} from 'react'
import service from '../appwrite/database'
function Room() {
    useEffect(()=>{
      getMessages()
     },[]);

     let [messages , setMessages] = useState([]);
     let [messageBody , setMessageBody] = useState('');

     const getMessages = async ()=>{
       const res =  await service.getMessages();
        setMessages(res.documents)
        //console.log(res.documents)
     }

     const handleSubmit = async (e)=>{
       e.preventDefault()
       let payload = {
          body : messageBody
       }
       let res = await service.createMessage(payload);
       console.log(res)
       setMessages(prev=>[ ...messages , res])
       setMessageBody('');
     }

     
  return (
    <div>
     <h1>ROOM </h1> 

    

     { messages.map((message)=>(<div key = {message.$id}>
      <p>{message.$createdAt}</p>
      {message.body}
      <hr/>
     </div>))

     }

<form  onSubmit={handleSubmit}>
      <div>
        <textarea
        required 
        maxLength ="1000"
        palceholder= "say something..."
        onChange={(e)=>{setMessageBody(e.target.value)}}
        value = {messageBody}
        style={{ border: '1px solid #ccc', padding: '8px' }}
        ></textarea>
      </div>
        <input type="submit" value="Send"/>
     </form>
    </div>
  )
}

export default Room
