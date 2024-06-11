import { React, useState } from "react";
// import Interview from './pages/Interview';
import Posts from "./pages/Posts";
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import Logout from "./pages/Logout";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";

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
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/edit/:id" element={<EditPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </main>
      </BrowserRouter>
        {/* <Interview /> */}
    </>
  );
}

export default App;
