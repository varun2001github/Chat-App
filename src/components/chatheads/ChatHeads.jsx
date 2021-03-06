import React from "react";
import { Avatar } from "@mui/material";
import "./chatheads.css";
export default function ChatHeads({ items, setReceiver }) {
  return (
     <div className="chat-head-main">
        <h3 className="chat-list-header">CHATS</h3>
        <hr></hr>
        {items.map((obj,i)=>(
           <div key={i} className="chat-head-items" onClick={()=>setReceiver(obj)}>
             <Avatar >{obj.email[0].toUpperCase()}</Avatar>
             <p>{obj.email}</p>
           </div>
        ))
        }
     </div>
  );
}