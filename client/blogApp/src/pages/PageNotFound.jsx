import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="errorContainer">
        <h1 className="error">404 Error</h1>
        <h1>The page you are looking for is not found</h1>
        <p>Please click on bellow links to go to respective pages.</p>
        <div className="linkContainer">
          <Link to={"/"}>Home</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
