import React from "react";

const SinglePost = () => {
  return (
    <>
      <div className="post">
      <div className="image">
      <img
          src="https://techcrunch.com/wp-content/uploads/2024/06/cybersecurity-data-sharing-2024-v2.jpg?resize=1200,675"
          alt="security"
        />
      </div>
        <div className="texts">
          <h2>
            Hundreds of Snowflake customer passwords found online are linked to
            info-stealing malware
          </h2>
          <p className="info">
            <a href="" className="author">Ravi's World</a>
            <time>2024-05-06 10:37</time>
          </p>
          <p className="summary"> 
            Cloud data analysis company Snowflake is at the center of a recent
            spate of alleged data thefts, as its corporate customers scramble to
            understand if their stores of cloud data have been compromised.
          </p>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
