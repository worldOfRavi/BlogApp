import React from "react";
import SinglePost from "./SinglePost";
import { useAuth } from "../store/auth.jsx";

const Posts = () => {
  const { posts } = useAuth();

  return (
    <>
      <div className="post-container">
        {posts.map((post, ind) => {
          return <SinglePost key={ind} {...post} />;
        })}
      </div>
    </>
  );
};

export default Posts;
