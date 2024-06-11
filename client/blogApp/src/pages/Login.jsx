import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../store/auth.jsx';

const Login = () => {
  const {setUserInfo} = useAuth();
  const [data, setData] = useState({
    email:"",
    password:""
  })

  const navigate = useNavigate();

// function to handle the inputs
  const handleInput = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData({
      ...data, 
      [name]:value
    })
  }

  
  // function to handle the sumbission
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials: 'include',
        body:JSON.stringify(data)
      })
      const responseData = await response.json();
      if(response.ok){
        setUserInfo(responseData.user);
        toast.success("login successful");
        setData({
          email:"",
          password:""
        })
        navigate("/");
      }
      else{
        toast.error(responseData.message);
      }
  
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <>
    <form className='loginForm' onSubmit={handleSubmit}>
    <h1>Login</h1>
        <input type="email" name="email" id="email" required
          placeholder='Email'
          value={data.email}
          onChange={handleInput}
        />
        <input type="password" name="password" id="password" required
          placeholder='Password'
          value={data.password}
          onChange={handleInput}

        />
        <button type="submit">Login</button>
    </form>
    </>
  )
}

export default Login
