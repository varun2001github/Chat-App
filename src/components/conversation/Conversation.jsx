import React, { useState,useEffect,useRef} from 'react';
import './conversation.css';
import { Button } from '@mui/material';
import { db } from '../../firebase';
import {doc, getDoc, updateDoc, setDoc} from "@firebase/firestore";
export default function Conversation({receiver,user}) {
    const [conversationid,setConversationid]=useState(null);
    // const [messages,setMessages]=useState([]);
    const currentMessages=useRef(null);
    
    //handle sending messages
    async function sendmessage(){
      
      //  setMessages([...messages,input]);
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
        // console.log(messages);
      } else {
        // create a new conversation
        await setDoc(doc(db, "conversations", conversationid), {
          messages:[myMessage],
        });
      }
      currentMessages.current.value = "";
    };
      // console.log(input);
    //set conversation id
    useEffect(()=>{
        if (!receiver || !user) return;
        let myConvId;
        if (receiver.uid > user.uid) myConvId = receiver.uid + user.uid;
        else myConvId = user.uid + receiver.uid;
        setConversationid(myConvId);
    },[receiver,user]);
    // console.log(conversationid);
    // console.log(conversationid)
    // const handleEnterKeyPressDown = (e) => {
    //   if ((e.code === "Enter" || e.key === "Enter") && !e.shiftKey) {
    //     sendmessage();
    //   }
    // };

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
            {/* { messages.map((obj,i)=>(
            <p key={i} className='chats'>{obj.message}</p>))} */}
        </div>
        <div class='chat-key'>
          <input  class="input-msg" ref={currentMessages}/>
          <span className="chat-button">
            <Button type="submit" variant="contained" onClick={sendmessage}>send</Button>
          </span>
        </div>
     </div>
);
}











// import React, { useState,useEffect,useRef} from 'react';
// import './conversation.css';
// import { Button } from '@mui/material';
// import { db } from '../../firebase';
// import { getDoc,doc,addDoc,collection,updateDoc,setDoc} from "@firebase/firestore";
// export default function Conversation({receiver,user}) {
//   const [messages,setMessages]=useState([]);
//   const [input,setInput]=useState("");
//   const [conversationid,setConversationid]=useState(null);
//   const currentMessages=useRef(null);
  
//   //handle sending messages
//   async function sendmessage(event){
     
//     //  setMessages([...messages,input]);
//      setInput('');
//      const myMessage={
//           message:currentMessages.current.value,
//           uid:user.uid ,
//      };
//      console.log(currentMessages.current.value);

//      //save to firestore
//      const conversationRef = doc(db, "conversations", conversationid);
//      const docSnap = await getDoc(conversationRef);
//      console.log(docSnap.data());

//      // append message to existing conversation
//     if (docSnap.exists()) {
//       const docData = docSnap.data();
//       await updateDoc(conversationRef, {
//         messages: [...docData.messages,myMessage],
//       });
//     } else {
//       // create a new conversation
//       await setDoc(doc(db, "conversations", conversationid), {
//         messages:[myMessage],
//       });
//     }
//     currentMessages.current.value = "";
//       // Add a new document in collection "cities"
//     // await addDoc(collection(db, "messages"),{
//     //   email:user.email,
//     //   messages:input,
//     // });
//   };
//      console.log(input);
//   //set conversation id
//   useEffect(()=>{
//       if (!receiver || !user) return;
//       let myConvId;
//       if (receiver.uid > user.uid) myConvId = receiver.uid + user.uid;
//       else myConvId = user.uid + receiver.uid;
//       setConversationid(myConvId);
//   },[receiver,user]);
//   // console.log(conversationid);

//   // console.log(conversationid)
//   return(
//      <div className='conversation-main'>
//        {receiver?(
//          <div>
//           <div class="chat-heading"><h3>Chat with {receiver.email}</h3></div>
//           <div className='chat-messages'></div>
//          </div>
//        ):(
//          <div>SELECT SOMEONE TO CHAT</div>
//        )}
//        <div className='messages-section'>
//             { messages.map(message=>(
//             <p className='chats'>{message}</p>))}
//        </div>
//        <div class='chat-key'>
//          <input  class="input-msg" ref={currentMessages} />
//          <span className="chat-button">
//             <Button type="submit" variant="contained" onClick={sendmessage}>send</Button>
//          </span>
//        </div>
//     </div>
//   );
// }
