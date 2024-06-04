import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Modal from "./components/Modal";
import CardArea from "./components/CardArea";
import CreateRoom from "./components/CreateRoom";
import UserReg from "./components/UserReg";
import UserLogin from "./components/UserLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserReg />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/tasker" element={<Wrapper />} />
          <Route path="/JoinRoom" element={<Modal />} />
          <Route path="/AfterJoinRoom" element={<CardArea />} />
          <Route path="/CreateRoom" element={<CreateRoom />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
