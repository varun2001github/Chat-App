import React from 'react'
import './navbar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function Navbar({user,setUser}) {
  const history=useHistory();
  function signout(){
    localStorage.setItem("user",null);
    setUser(null);
    history.push("/");
  };
  return (
    <div>
     {user?(
      <div class="navigation">
        <h2>welcome,{user.email}</h2>
       <div class="bclass">
       <Button class="logout-btn" onClick={signout} endIcon={<LogoutIcon/>} >Log out</Button>
       </div>
      </div>
       ):(
      <div>
      <h1>LOGO</h1>
      </div>)
    }
    </div>
  );
}

export default Navbar
