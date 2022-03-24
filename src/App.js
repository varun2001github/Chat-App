import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import ChatScreen from "./screens/chat-screen/ChatScreen";
import LoginScreen from "./screens/login-screen/LoginScreen";
function App(){
  const [user,setUser]=useState(null);
  return (
    <div>
      <LoginScreen/>
    </div>
  );
}
export default App;