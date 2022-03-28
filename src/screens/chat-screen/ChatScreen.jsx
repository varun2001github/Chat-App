import React from "react";
import { useHistory } from "react-router-dom";
import ChatHeads from "../../components/chatheads/ChatHeads";
import Conversation from "../../components/conversation/Conversation";
import "./chat-screen.css";
import { useState } from "react";
import { collection,getDocs } from "firebase/firestore";
import { db } from "../../firebase";
export default function ChatScreen({ setUser, user }){
  let history = useHistory();

  const [chatHeads, setChatHeads] = useState([]);
  const [receiver, setReceiver] = useState(null);

  React.useEffect(() => {
    // get from localstorage
    const user = JSON.parse(localStorage.getItem("user"));

    // if no user -> redirect
    if (user) setUser(user);
    else history.push("/");
  }, [history, setUser]);

  React.useEffect(() => {
    if (!user) return;

    (async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setChatHeads(
        querySnapshot.docs
          .map((doc) => doc.data())
          .filter((obj) => obj.uid !== user.uid)
      );
    })();
  }, [user]);
  console.log(chatHeads);
  return (
   <div class="chat-screen">
     <div class="chat-head">
        <ChatHeads items={chatHeads} setReceiver={setReceiver}/>
     </div>
     <div class="conversation">
         <Conversation receiver={receiver} user={user}/>
     </div>
   </div>
  );
 }
 