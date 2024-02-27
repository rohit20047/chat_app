import React, { useEffect, useState, useRef } from "react";
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
  const scrollAble = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      localStorage.clear();
      navigate("/signup");

    
    }
    authService.getCurrentUser().then((userData) => {
      setUserData(userData);
    });
    setTimeout(() => {
      scrollAble.current?.scrollTo(0, scrollAble.current.scrollHeight);
    }, 50);
  }, []);

  useEffect(() => {
    getMessages();

    const unsubscribe = authService.subscribeToDocuments((respond) => {
     

      if (
        respond.events.includes("databases.*.collections.*.documents.*.create")
      ) {
     
        if (messages.length < 203) {
          setMessages((prevMessages) => [...prevMessages, respond.payload]);
       
      
        } else {
          let g = messages.shift().$id;

          deleteMessage(g);
         
          setMessages((prevMessages) => [...prevMessages, respond.payload]);

          //setMessages((prevMessages) => [...prevMessages, respond.payload]);
        }
      }
      if (
        respond.events.includes("databases.*.collections.*.documents.*.delete")
      ) {
    
        setMessages((prev) =>
          messages.filter((message) => message.$id !== respond.payload.$id)
        );
      }
    });
    bgDelete();
    setTimeout(() => {
      scrollAble.current?.scrollTo(0, scrollAble.current.scrollHeight);
    }, 50);
    return () => {
      // Unsubscribe when the component is about to unmount
      unsubscribe();
    };
  }, [messages.length]);

  const getMessages = async () => {
    const res = await service.getMessages();

    if (res.documents.length > 25) {
      let l = res.documents.length - 25;
      let arr = res.documents.slice(l);
      setMessages(arr);
   
    } else {
      setMessages(res.documents);
    }
  };
  const deleteMessage = async (message_id) => {
  
    await service.deleteMessage(message_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setTimeout(() => {
      scrollAble.current?.scrollTo(0, scrollAble.current.scrollHeight);
    }, 50);
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
     
      }
    }
  };

  const keyHandle = () => {
    handleSubmit();
  };

  return (
    <div className=" bg-slate-900  ">
      <div className=" bg-slate-900 sticky top-0 flex items-center justify-between px-10 py-2">
        <Header />
        <LogoutBtn />
      </div>

      <div className="overflow-auto" ref={scrollAble}>
        <div className="bg-slate-900  ">
          {messages.map((message) => (
            <div >
              <div
                key={message.$id}
                className=" p-2 flex flex-col items-start  pb-10"
              >
                <div className="flex items-center justify-start w-full space-x-9">
                  <p
                    className="text-yellow-300"
                    style={{
                      fontFamily: "Kode Mono, monospace",
                      fontWeight: 400,
                    }}
                  >
                    {new Date(message.$createdAt).toLocaleString()}
                  </p>
                  <span
                    className="font-bold text-yellow-500"
                    style={{
                      fontFamily: "Kode Mono, monospace",
                      fontWeight: 700,
                    }}
                  >
                    {message?.user_name ? message.user_name : "Anonymous"}
                  </span>
                  {userData &&
                    message?.$permissions.includes(
                      `delete(\"user:${userData.$id}\")`
                    ) && (
                      <Trash2
                        className="cursor-pointer   text-yellow-500 rounded-md  hover:bg-slate-800"
                        onClick={() => deleteMessage(message.$id)}
                        key={message.$id}
                      />
                    )}
                </div>

                <div
                  className="bg-slate-800 inline-block px-4 mb-1 text-lg rounded-md self-center text-white"
                  style={{
                    fontFamily: "Kode Mono, monospace",
                    fontWeight: 200,
                  }}
                >
                  {message?.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className=" sticky bottom-0" onSubmit={handleSubmit}>
        <div className="flex flex-row items-center">
          <input
            type="text"
            value={messageBody}
            onChange={(e) => {
              setMessageBody(e.target.value);
            }}
            onKeyDown={keyHandle}
            style={{ fontFamily: "Kode Mono, monospace", fontWeight: 700 }}
            placeholder="Here....!!"
            className=" bg-slate-800  p-4 w-full rounded-md text-white"
          ></input>

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
