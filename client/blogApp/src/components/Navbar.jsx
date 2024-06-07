import React from "react";
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <header>
        <a href="/" className="logo">
          MyLogo
        </a>
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
