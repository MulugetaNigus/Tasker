import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IUserReg } from "../Types/App.Type";
import Spinner from "react-bootstrap/Spinner";

const UserLogin = () => {
  // containers to hold user info
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  // error indicator for those values(username , RoomCode)
  const [Xusername, setXusername] = useState(false);
  const [Xpassword, setXpassword] = useState(false);

  // loading state
  const [loading, setloading] = useState(false);

  // error logger
  const [errorLogger, seterrorLogger] = useState("");
  const navigate = useNavigate();

  // to handle user reg
  const handleLog = async () => {
    // check the inputs passed properlly
    if (!username) {
      return setXusername(true);
    }
    if (!password) {
      return setXpassword(true);
    }
    if (!username && !password) {
      return setXusername(true), setXpassword(true);
    }
    // start loading indicator
    setloading(true);
    // create the user obj
    const user: IUserReg = {
      username,
      password,
    };

    // to simulate the loading indicator
    setTimeout(async () => {
      try {
        // try to make axios req
        await axios
          .post("http://localhost:3001/api/v1/login", user)
          .then((result) => {
            if (result.data.message === "success") {
              seterrorLogger(result.data.message);
              setloading(false);
              // to prevent the route, just true something here and validate in the app route
              window.localStorage.setItem("TaskerUser", username.toString().toUpperCase());
              navigate("/tasker");
            }
            if (result.data.message === "Xpassword") {
              seterrorLogger("incorrect password");
              setloading(false);
            }
          })
          .catch((err) => {
            seterrorLogger(err.response.data.message);
            setloading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  };

  return (
    <>
      <div className="mx-auto flex flex-column md:w-3/6 mt-48 user border-2 border-violet-200 bg-violet-100 shadow-md rounded-md md:p-4 p-2">
        <p className="md:text-4xl text-2xl font-extrabold text-violet-700 mb-4 bg-violet-200 p-3 rounded shadow-md">
          Collabo Login
        </p>
        {errorLogger && (
          <p className="text-center border-2 border-red-200 p-2 rounded-md bg-red-200 m-1 font-extra fs-6">
            {errorLogger}
          </p>
        )}
        <label
          htmlFor="username"
          className="flex items-start justify-start mb-1"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border-2 border-violet-300 p-2 placeholder-violet-400 rounded-md"
          placeholder="Micheal Pollio"
          onChange={(e) => setusername(e.target.value)}
          value={username}
        />
        {Xusername && (
          <small className="text-danger">* username is required</small>
        )}
        <label
          htmlFor="passwordID"
          className="flex items-start justify-start mb-1 mt-3"
        >
          password
        </label>
        <input
          type="password"
          id="passwordID"
          className="border-2 border-violet-300 p-2 placeholder-violet-400 rounded-md"
          placeholder="Micheal Pollio"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        {Xpassword && (
          <small className="text-danger">* password is required</small>
        )}
        <Link to="/" className="mt-2">
          don't have an account ?
        </Link>
        <div className="actionBtn" onClick={() => handleLog()}>
          <p className="border-1 text-white rounded py-3 px-8 mt-3 text-center md:w-2/6 cursor-pointer transition hover:scale-105 ease-out duration-300 bg-violet-700 font-extrabold font-serif">
            {loading ? (
              <Spinner animation="border" role="status" className="fs-6">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <b>Login</b>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
