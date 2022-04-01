import React, { useState,useRef} from 'react';
import './conversation.css';
import { Button } from '@mui/material';
export default function Conversation({receiver,user}) {
  // const [messages,setMessages]=useState([]);
  // const [input,setInput]=useState("");
  // const [conversationid,setConversationid]=useState(null);
  const mymessage=useRef(null);
  const sendmessage=()=>{
     const cmessage=mymessage.current.value;
     console.log(cmessage)
  }
  // React.useEffect=(()=>{
  //  if(!user||!receiver) return;
  //  let myconvid;
  //  if(receiver.uid>user.uid) myconvid= receiver.uid+user.uid;
  //  else myconvid= user.uid+receiver.uid;
  //  setConversationid(myconvid);
  // },[receiver,user]);

  // console.log(conversationid)
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
         <input  class="input-msg"/>
         <span className="chat-button">
           <Button type="submit" variant="contained" onClick={sendmessage}>send</Button>
         </span>
       </div>
    </div>
  );
}
