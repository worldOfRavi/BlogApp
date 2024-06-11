import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [data, setData] = useState({
    username:"",
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
    const response = await fetch("http://localhost:3000/api/auth/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const responseData = await response.json();
    if(response.ok){
      toast.success("Registtred successfully");
      setData({
        username:"",
        email:"",
        password:""
      })
    }
    else{
      toast.error(responseData.message);
    }

  }
  return (
    <>
    <form className='registerForm' onSubmit={handleSubmit}>
    <h1>Register</h1>
    <input type="text" name="username" id="username" required
          placeholder='username'
          value={data.username}
          onChange={handleInput}
        />
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
        <button type="submit">Register</button>
    </form>
    </>
  )
}

export default Register
