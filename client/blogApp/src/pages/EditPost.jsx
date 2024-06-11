import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "../components/Editor.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
    const navigate = useNavigate();
  //   get post id from the url
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  //   const [content, setContent] = useState(postInfo.content);
  const [file, setFile] = useState(null);

  // function to handle the the image file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.postDetails.title);
        setSummary(postInfo.postDetails.summary);
        setContent(postInfo.postDetails.content);
      });
    });
  }, []);

  //   function to handle the submmit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    if(file?.[0]){
        formData.append("file", file);
    }
    const response = await fetch(`http://localhost:3000/post/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    const responseData = response.json();
    if(response.ok){
        toast.success(responseData.message);
        navigate(`/post/${id}`)
    }
    else{
        toast.error("Something went wrong...!");    
    }
  };

  return (
    <>
      <h1 className='formHeader'>Update Your Post</h1>
      <form className="createPost" onSubmit={handleSubmit}>
        <input
          type="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="summary"
          name="summary"
          placeholder="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <input type="file" name="file" onChange={handleFileChange} />
        <Editor value={content} onChange={setContent} />
        <div className="buttonContainer">
          <button type="submit" className="createButton">
            Update Post
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPost;
