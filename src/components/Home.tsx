import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* main banner */}
      <div className="grid md:grid-cols-6 m-auto p-3">
        <div className="side"></div>
        <p className="text-violet-600 md:text-7xl text-4xl font-serif font-extrabold col-span-4 md:mt-28 mt-10 text-start">
          No SignUp, Email, Phone Number Just Get Started With Your{" "}
          <span className="text-black md:text-7xl text-5xl font-serif font-extrabold">
            Project
          </span>{" "}
          Idea.
        </p>
        <div className="side"></div>
      </div>

      {/* action btn */}
      <div className="grid md:grid-cols-6 m-auto p-3">
        <div className="side"></div>
        <div className="actionBtn flex flex-row md:grid-cols-2 md:col-span-4 md:gap-4 gap-3">
          <p className="border-1 text-decoration-none rounded py-3 md:px-10 px-3 cursor-pointer transition hover:scale-110 ease-out duration-300 bg-violet-700 font-extrabold font-serif">
            <Link to="/JoinRoom" className="text-decoration-none text-white">
              Join Room
            </Link>
          </p>
          <p className="border-1 text-violet-700 hover:scale-110 rounded py-3 px-10 cursor-pointer hover:transition ease-out duration-300 bg-violet-100 font-extrabold font-serif">
            <Link to="/CreateRoom" className="text-decoration-none">Create Room</Link>
          </p>
        </div>
        <div className="side"></div>
      </div>
    </>
  );
};

export default Home;
