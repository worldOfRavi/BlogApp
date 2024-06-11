import React from "react";
import {formatISO9075} from 'date-fns';
import { Link } from "react-router-dom";

const SinglePost = ({
  _id,
  title,
  summary,
  cover,
  updatedAt,
  author
}) => {
  // console.log(userInfo);
  return (
    <>
      <div className="post">
        <div className="image">
        <Link to={`/post/${_id}`}>
        <div className="image">
          <img src={`http://localhost:3000/`+cover} />
        </div>
        </Link>
          
        </div>
        <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2 className="title">{title}</h2>
          </Link>
          <p className="info">
            <a href="" className="author">
              {author.username}
            </a>
            <time>{formatISO9075(new Date(updatedAt))}</time>
            {/* <time>{updatedAt}</time> */}
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
