import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../store/auth.jsx';
import { toast } from 'react-toastify';
import Editor from '../components/Editor.jsx';



const CreatePost = () => {

  // logic to fetch the user data
  const {getAllPosts} = useAuth();
  const navigate = useNavigate();
 const [data, setData] = useState({
  title:"",
  summary:"",
 });
 const [file,setFile] = useState(null);
 const [content,setContent] = useState("");

//  function to hnadle the change
const handleChange = async(e)=>{
  const name = e.target.name;
  const value = e.target.value
  setData({
    ...data,
    [name]:value
  })
}

// Function to handle the file change
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

// function to handle the submit
const createNewPost = async(e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('summary', data.summary);
  formData.append('content', content);
  formData.append('file', file);
 const response = await fetch("http://localhost:3000/post/create",{
  method:"POST",
  credentials:"include",
  body:formData
 })
 const responseData = await response.json();
 console.log(responseData);
if(response.ok){
  toast.success(responseData.message);
  getAllPosts();
  navigate("/");
}else{
  toast.error("Something goes wrong while posting your blog...!")
}

console.log(content);
}
  return (
    <>
      <h1 className='formHeader'>Create Your Post</h1>
      <form className='createPost' onSubmit={createNewPost}>
        <input type="title" name='title' placeholder='Title' value={data.title} onChange={handleChange} required/>
        <input type="summary" name='summary' placeholder='summary' value={data.summary}  onChange={handleChange} required/>
        <input type="file" name="file"  
        onChange={handleFileChange}  />
      <Editor value={content} onChange={setContent}  />
      <div className="buttonContainer">
      <button type='submit' className='createButton'>Create Post</button>
      </div>
      </form>
    </>
  )
}

export default CreatePost;
