import React, { useState,useEffect,useRef} from 'react';
import './conversation.css';
import { Button,Avatar,SendIcon} from '@mui/material';
import { db } from '../../firebase';
import {doc, getDoc, updateDoc, setDoc,onSnapshot} from "@firebase/firestore";

export default function Conversation({receiver,user}) {
    const [conversationid,setConversationid]=useState(null);
    const [messages,setMessages]=useState([]);
    const currentMessages=useRef(null);
    
    //handle sending messages
    async function sendmessage(){
      console.log(receiver);
      const myMessage={
            message:currentMessages.current.value,
            uid:user.uid ,
      };
      
      //save to firestore
      const conversationRef = doc(db,"conversations", conversationid);
      const docSnap = await getDoc(conversationRef);

      // append message to existing conversation
      if (docSnap.exists()) {
        const docData = docSnap.data();
        const hist=docData.messages
        console.log(hist);
        await updateDoc(conversationRef, {
          messages: [...hist,myMessage],
        });
      } else {
        // create a new conversation
        await setDoc(doc(db, "conversations", conversationid), {
          messages:[myMessage],
        });
      }
      currentMessages.current.value = "";
    };
    
    //set conversation id
    useEffect(()=>{
        if (!receiver || !user) return;
        let myConvId;
        if (receiver.uid > user.uid) myConvId = receiver.uid + user.uid;
        else myConvId = user.uid + receiver.uid;
        setConversationid(myConvId);
    },[receiver,user]);

    //get messages from firestore
    useEffect(()=>{
        if (!conversationid) return;
        const unsub = onSnapshot(
          doc(db, "conversations", conversationid),
          (doc) => {
            const currentData = doc.data();
            if (currentData?.messages.length > 0) setMessages(currentData.messages);
            else setMessages([]);
          }
        );
        return unsub;
    },[conversationid]);
    
  return(
  <div className='conversation-main'>
    {receiver?(
      <div>
      <div class="chat-heading"><h3>Chat with {receiver.email}</h3></div>
      <div className='chat-messages'></div>
      </div>
      ):(
            <div>SELECT SOMEONE TO CHAT</div>
      )}
      <div className='messages-section'>
        { 
           messages.map((obj,i)=>(          
            <div key={i} className="message" style={{justifyContent: obj.uid===user.uid && "flex-end"}} >
               {obj.uid===user.uid?<Avatar color="blue">{user.email[0]}</Avatar>:<Avatar >{receiver.email[0]}</Avatar>}
               <div className='chat-bubble'>{obj.message}</div>
            </div>))
        }
      </div>
        <div class='chat-key'>
          <input placeholder='Enter the message' className="input-msg" ref={currentMessages}/>
          <span className="chat-button">
            <Button type="submit" variant="contained" onClick={sendmessage}>send</Button>
          </span>
        </div>
    </div>
); 
}

