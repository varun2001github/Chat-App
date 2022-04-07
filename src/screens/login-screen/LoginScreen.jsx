import React ,{useRef}from "react";
import "./login-screen.css";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "@firebase/auth";
// import { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";
import { useHistory } from "react-router-dom";
export default function LoginScreen({ setUser }) {
  let history = useHistory();

  const email = useRef(null);
  const password = useRef(null);
  const register = async () => {
    const myEmail = email.current.value;
    const myPassword = password.current.value;

    try {
       const responseFromAuth = await createUserWithEmailAndPassword(
         auth,
         myEmail,
         myPassword
      );
      const userId = responseFromAuth.user.uid;
      // saving to firestore
      await addDoc(collection(db, "users"),{
        email:myEmail,
        uid:userId,
      });
      // save user to localstorage
      localStorage.setItem("user",
        JSON.stringify({
          email: myEmail,
          uid: userId,
        })
      );

      // set user as active in app
      setUser({
        email: myEmail,
        uid: userId,
      });

      history.push("/chat");
      } catch (error) {
      alert(error);
    }
  };

  const login = async () => {
    const myEmail = email.current.value;
    const myPassword = password.current.value;

    try {
      const responseFromAuth = await signInWithEmailAndPassword(
        auth,
        myEmail,
        myPassword
      );

      const userId = responseFromAuth.user.uid;

      // save user to localstorage
      localStorage.setItem(  "user",JSON.stringify ( { email: myEmail , uid: userId,} )  );

      // set user as active in app
      setUser({
        email: myEmail,
        uid: userId,
      });

      history.push("/chat");
    } catch (error) {
      alert(error);
    }
  };
   React.useEffect(() => {
    //user from localstorage
     const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
       setUser(user);
       history.push("/chat");
      }
   }, [history, setUser]);
  return (
     <div className="login-screen-container" name="body" >
        <p className="login-title">Welcome!</p>
        <div>
          <p>Email</p>
          <input placeholder="youremail@example.com" ref={email} required />
        </div>
        <div>
          <p>Password</p>
          <input type="password" placeholder="Strong password" ref={password} required />
        </div>
        <button onClick={login} className="login-button" >Login</button>
        <button onClick={register} className="register-button">Register</button>
      </div>
   );
}
