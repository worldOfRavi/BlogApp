import { React, useState } from "react";
// import Interview from './pages/Interview';
import Posts from "./pages/Posts";
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <main>
      <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </main>
      </BrowserRouter>
        {/* <Interview /> */}
    </>
  );
}

export default App;
