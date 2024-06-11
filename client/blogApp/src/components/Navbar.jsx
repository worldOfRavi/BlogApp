import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../store/auth.jsx";

const Navbar = () => {
  const {userInfo, setUserInfo} = useAuth();

  const navigate = useNavigate();
  const getUserProfile = async ()=>{
    const response = await fetch('http://localhost:3000/api/auth/profile',{
      method:"GET",
      credentials:'include',
    })
    const responseData = await response.json();
    setUserInfo(responseData);

  }
  useEffect(()=>{
    getUserProfile();
  },[])
 const username = userInfo?.username;
  const userLogout = async()=>{
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout',{
        method:"POST",
        credentials:'include',
      })
      if(response.ok){
        toast.success("Logout successfull");
        navigate("/");
        setUserInfo(null);
      }
      else{
        toast.error("Error in user logout");
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header>
        <a href="/" className="logo">
          MyLogo
        </a>
        <nav>
        {username ? <>
          <Link to="/create">Create New Post</Link>
          <Link onClick={userLogout}>Logout ({username})</Link>
        </>:
        <>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        </>}
          
        </nav>
      </header>
    </>
  );
};

export default Navbar;
