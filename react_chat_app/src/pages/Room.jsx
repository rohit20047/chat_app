import React, { useEffect, useState } from "react";
import service from "../appwrite/database";
import { Trash2, LogOut, Send } from "react-feather";

import { authService } from "../appwrite/auth";
import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";
import SignupPage from "./SignUpPage";
import { Navigate, useNavigate } from "react-router-dom";
import { Header, LogoutBtn } from "../components";
import { Role, Permission } from "appwrite";
import bgDelete from "../appwrite/backgroundDelete";
function Room() {
  let [messages, setMessages] = useState([]);
  let [messageBody, setMessageBody] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      localStorage.setItem("auth", "yes");
      navigate("/signup");

      console.log("GO TO SIGNUP");
    }
    authService.getCurrentUser().then((userData) => {
      setUserData(userData);
      
    });
    
    bgDelete()
   
  }, []);

  useEffect(() => {
    getMessages();
    const unsubscribe = authService.subscribeToDocuments((respond) => {
      //console.log("ressss", respond);

      if (
        respond.events.includes("databases.*.collections.*.documents.*.create")
      ) {
        // console.log("created",respond)
        if (messages.length < 203) {
          setMessages((prevMessages) => [...prevMessages, respond.payload]);
          //  let el = messages.shift().$id
          //  console.log("aftereeee" ,el)
          console.log("aftereeee", messages.length);
        } else {
          let g = messages.shift().$id;
          
          deleteMessage(g);
          console.log("deleted", messages.length);
          setMessages((prevMessages) => [...prevMessages, respond.payload]);
          
          //setMessages((prevMessages) => [...prevMessages, respond.payload]);
        }
      }
      if (
        respond.events.includes("databases.*.collections.*.documents.*.delete")
      ) {
        //console.log("deleted")
        setMessages((prev) =>
          messages.filter((message) => message.$id !== respond.payload.$id)
        );
       
      }
     //
    });

    return () => {
      // Unsubscribe when the component is about to unmount
      unsubscribe();
    };

   
  }, [messages.length]);

  // useEffect(() => {
  //   getMessages();
  // }, [messages.length]);
  

  const getMessages = async () => {
   const res = await service.getMessages();
    console.log("get messages", res.documents);
    if(res.documents.length > 25){
      let l = res.documents.length - 25;
      let arr = res.documents.slice(l);
    setMessages(arr);
    console.log(arr.length);

    }

    else {
      setMessages(res.documents)
    }

    
    //console.log(res.documents)
  };
  const deleteMessage = async (message_id) => {
    console.log(message_id);
     await service.deleteMessage(message_id);
    //setMessages(prev => messages.filter(message => message.$id !== message_id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageBody.length != 0) {
      let payload = {
        body: messageBody,
        user_name: userData.name,
      };
      let permission = [Permission.write(Role.user(userData.$id))];
      try {
        let res = await service.createMessage(payload, permission);
        setMessageBody("");
      } catch (error) {
        console.error("Error creating message:", error);
      }
    }
  };

  // if(authStatus == false){
  //  return <Navigate to = "/signup"/>
  // }

  return (
    <div className=" bg-slate-900">
      <div className=" bg-slate-900 sticky top-0 flex items-center justify-between px-10 py-2">
        <Header />
        <LogoutBtn />
      </div>

      <div className="bg-slate-900 ">
        {messages.map((message) => (
          <>
            <div
              key={message.$id}
              className=" p-2 flex flex-col items-start  pb-10"
            >
              <div class="flex items-center justify-start w-full space-x-9">
                <p className="text-yellow-300">
                  {new Date(message.$createdAt).toLocaleString()} 
                </p>
                <span class="font-bold text-yellow-500">
                  {message?.user_name ? message.user_name : "Anonymous"}
                </span>
                {userData &&
                  message?.$permissions.includes(
                    `delete(\"user:${userData.$id}\")`
                  ) && (
                    <Trash2
                      className="cursor-pointer   text-yellow-500 rounded-md  hover:bg-slate-800"
                      onClick={() => deleteMessage(message.$id)}
                    />
                  )}
              </div>

              <div className="bg-emerald-500 inline-block px-4 mb-1 text-lg rounded-md self-center">
                {message?.body}
              </div>
            </div>
          </>
        ))}
      </div>

      <form className=" sticky bottom-0" onSubmit={handleSubmit}>
        <div className="flex flex-row items-center">
          <textarea
            required
            maxLength="1000"
            placeholder="Say something..."
            onChange={(e) => {
              setMessageBody(e.target.value);
            }}
            value={messageBody}
            className=" bg-slate-800  p-2 w-full rounded-md text-yellow-500"
          ></textarea>

          <Send
            onClick={handleSubmit}
           className="text-yellow-500 p-2 size-10 m-2 cursor-pointer rounded-md bg-slate-800 hover:bg-slate-700"
          />
        </div>
      </form>
    </div>
  );
}


export default Room;