import React, { useState } from 'react';
import './conversation.css';
import { Button } from '@mui/material';
export default function Conversation({receiver}) {
  const [messages,setMessages]=useState([]);
   
  return(
     <div>
       {receiver?(
         <div>
          <div class="chat-heading"><h3>Chat with {receiver.email}</h3></div>
          <div className='chat-messages'></div>
         </div>
       ):(
         <div>SELECT SOMEONE TO CHAT</div>
       )}
       <div class='chat-key'>
         <input class="input-msg"></input>
         <span className="chat-button">
           <Button variant="contained">send</Button>
         </span>
       </div>
    </div>
  );
}
