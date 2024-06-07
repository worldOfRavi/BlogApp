import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [data, setData] = useState({
    email:"",
    password:""
  })

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
    const response = await fetch("http://localhost:3000/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const responseData = await response.json();
    console.log(responseData);
    if(response.ok){
      toast.success("loged In successfully");
    }
    else{
      toast.error(responseData.message);
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
