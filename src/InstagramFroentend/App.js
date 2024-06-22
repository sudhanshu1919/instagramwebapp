import React, { createContext, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import SingnUp from "./SingnUp/SingnUp";
import Signin from "./Signin/Signin";
import Profile from "./Profile/Profile";
import CreatePost from "./CreatePost/CreatePost";
import Modal from "./Modal";
import Userprofile from "./Userprofile/Userprofile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoginContaxt } from "./contaxt/LoginContaxt";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <LoginContaxt.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/SingnUp" element={<SingnUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route path="/CreatePost" element={<CreatePost />} />
          </Routes>
          <ToastContainer theme="dark" />

          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContaxt.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
