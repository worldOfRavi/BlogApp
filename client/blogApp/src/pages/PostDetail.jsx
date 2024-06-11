import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import { useAuth } from '../store/auth';

const PostDetail = () => {
    // get post id from usl using useParam hook
    const {id} = useParams();
    const {getPostInfo,postInfo, userInfo}  = useAuth();
    
    useEffect(()=>{
        getPostInfo(id);
    },[]);
    if (!postInfo) {
        return <div>Loading...</div>;
      }
      const formattedDate = postInfo.createdAt ? formatISO9075(new Date(postInfo.createdAt)) : 'Invalid date';    
  return (
    <>
    <div className="postDetailContainer">
        <h1 className="title">{postInfo.title}</h1>
        <time>{formattedDate}</time>
        <p className="author">@{postInfo.author.username}</p>
        <div className="linkContainer">
        {userInfo.userId === postInfo.author._id && <Link className='EditLink' to={`/post/edit/${id}`}>Edit</Link>}
        
        </div>
        <div className="imageContainer">
            <img src={`http://localhost:3000/${postInfo.cover}`} />
        </div>
        <div className="summary">
            {postInfo.summary}
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        
            
    </div>
    </>
  )
}

export default PostDetail
