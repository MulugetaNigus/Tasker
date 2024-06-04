import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";

const Modal = () => {
  // join the rooms variables
  const [JoinRoom, setJoinRoom] = useState("");
  const [XJoinRoom, setXJoinRoom] = useState(false);
  const [AgreePolicy, setAgreePolicy] = useState(false);
  const [allTasks, setallTasks] = useState([]);

  // get all task to filter the matched code one !
  const getAllTask = async () => {
    await axios
      .get("http://localhost:3001/api/v1/getTask")
      .then((response) => {
        console.log(response.data.GetTask);
        setallTasks(response.data.GetTask);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllTask();
  }, []);

  // handle the join the room
  const navigate = useNavigate();
  const handleJoinRom = () => {
    
    if (JoinRoom === "" && JoinRoom.length === 6) {
      return setXJoinRoom(true);
    }

    // if (AgreePolicy === false) {
    //   return alert("please, agree with our term and conditions !");
    // }

    // filter out the task
    const filOut = allTasks?.filter(
      (singleTask: any) => singleTask.roomID === JoinRoom
    );
    if (filOut?.length <= 0) {
      setXJoinRoom(true);
      return console.log("Invalied Join Code !");
    }
    setXJoinRoom(false);
    window.localStorage.setItem("devArea", JoinRoom);
    // navgate to the right place
    navigate("/AfterJoinRoom");
  };

  return (
    <>
      <Nav />
      <div className="flex flex-column items-start justify-center mx-auto md:mx-2 md:mt-20 mt-20 mb-10 border-2 md:w-3/6 border-gray-200 rounded-md shadow-xl p-3 md:m-2">
        {/* header */}
        <h1 className="font-extrabold text-violet-600 text-start font-serif md:text-6xl text-3xl mb-2">
          Join The Rooms
        </h1>
        {/* inputs for the pincodes */}
        {/* <div className="inputs flex items-start justify-start"> */}
        <input
          type="number"
          className="border-2 rounded-md border-violet-300 md:w-2/6 p-3 placeholder:text-violet-500"
          placeholder="Enter Your Join Number.."
          onChange={(e) => setJoinRoom(e.target.value)}
          value={JoinRoom}
        />
        {XJoinRoom && (
          <p className="text-red-900 font-bold mt-2">Invalied Join Code !</p>
        )}
        {/* </div> */}
        {/* <div className="rule flex items-center justify-start gap-2">
          <input
            type="checkbox"
            className="cursor-pointer fs-4"
            onClick={() => setAgreePolicy(true)}
          />
          <p className="font-bold text-red-400 cursor-pointer mt-3">
            Agree With Term and Policy !
          </p>
        </div> */}
        <div className="text-muted mt-3">By Joining The Room We Are Assuming Agree With Our Privacy-Policy !</div>
        <div className="actionBtn flex items-start justify-between mt-2 md:gap-5 gap-2">
          <b
            className="border-1 text-white rounded py-3 px-10 cursor-pointer transition hover:scale-110 ease-out duration-300 bg-violet-700 font-extrabold font-serif"
            onClick={() => handleJoinRom()}
          >
            Join Room
          </b>
          <b
            className="border-1 text-white rounded py-3 px-10 cursor-pointer transition hover:scale-110 ease-out duration-300 bg-red-400 font-extrabold font-serif"
            onClick={() => { setJoinRoom("")}}
          >
            Reset
          </b>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Modal;
