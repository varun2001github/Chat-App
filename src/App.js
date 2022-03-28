import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import { BrowserRouter as Router,} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ChatScreen from "./screens/chat-screen/ChatScreen";
import LoginScreen from "./screens/login-screen/LoginScreen";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
      <Router>
        <Route path="/chat">
        <Navbar user={user} setUser={setUser} />
        </Route>
        <Switch>
          <Route path="/chat">
            <ChatScreen user={user} setUser={setUser} />
          </Route>
          <Route path="/">
            <LoginScreen user={user} setUser={setUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

