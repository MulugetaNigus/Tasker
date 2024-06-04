import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

// generate Join Code
import GenerateJoinCode from "./GenerateJoinCode";
import { ITask } from "../Types/App.Type";
import { spawn } from "child_process";

const CreateRoom: React.FC = () => {
  const [roomID, setRoomId] = useState("");
  const [devName, setDeveloperName] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [techStack , settechStack] = useState<string>("");
  const [allowUpdate , serallowUpdate] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [GeneratedJoinCode, setGeneratedJoinCode] = useState<any>();
  const [loadingState, setloadingState] = useState<boolean>(false);

  //   useEffect( () => {
  //     console.log(tasks);
  //   } , [tasks] )

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, taskInput]);
      setTaskInput("");
    }
  };

  // handle to generate join code
  const handleGenerateJoinCode = () => {
    setGeneratedJoinCode(GenerateJoinCode());
    setRoomId(GenerateJoinCode);
  };

  // handle to clear the form
  const handleClearForm = () => {
    setRoomId("");
    setDeveloperName("");
    setTasks((prevTasks) => [""]);
  };

  // handle to submit the task for the specific developer
  const handleSubmitTasks = async () => {
    // first check the values must be fiiled out
    if (!roomID || !devName || !tasks) {
      return alert("all fields are required !");
    }

    // start loading state
    setloadingState(true);
    // first collect the datas from the inputs
    const data: ITask = {
      roomID,
      devName,
      tasks,
      techStack,
      allowUpdate,
    };

    // make axios api calling here
    try {
      await axios
        .post("http://localhost:3001/api/v1/add", data)
        .then(() => {
          alert("task submit successfully !");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
          alert("something went wrong, please try again !");
          setloadingState(false);
        });
    } catch (err) {
      console.log(err);
      setloadingState(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-5xl font-bold text-violet-700 mb-6 font-serif">
          Create Room
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="roomId"
              className="block text-sm font-medium text-violet-700"
            >
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              value={roomID}
              onChange={(e) => setRoomId(e.target.value)}
              className="mt-1 block placeholder-violet-400 w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              placeholder="1304753"
            />
            <label
              htmlFor="roomId"
              className="block mt-3 text-sm font-medium text-violet-700"
            >
              Development Stack
            </label>
            <select name="dev" id="dev" className="mt-1 block placeholder-violet-400 w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            onChange={ (e) => settechStack(e.target.value)}
            >
              <option value="FrontEnd" selected disabled>Select Tech Stack</option>
              <option value="FrontEnd">FrontEnd</option>
              <option value="Backend">Backend</option>
            </select>

            {/* <label
              className="mt-2 cursor-pointer px-3 py-2 bg-violet-700 text-white text-sm font-medium rounded-md shadow-sm hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-50"
              onClick={() => handleGenerateJoinCode()}
            >
              Generate Join Code
            </label> */}
          </div>
          <div>
            <label
              htmlFor="developerName"
              className="block text-sm font-medium text-violet-700"
            >
              Developer Name
            </label>
            <input
              type="text"
              id="developerName"
              value={devName}
              onChange={(e) => setDeveloperName(e.target.value)}
              placeholder="Alexander Scott"
              className="mt-1 block placeholder-violet-400 w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="taskInput"
              className="block text-sm font-medium text-violet-700"
            >
              Add Task
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="taskInput"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="develope user auth"
                className="mt-1 placeholder-violet-400 block w-full px-3 py-2 border border-violet-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={handleAddTask}
                className="mt-1 px-3 py-2 transform hover:scale-110 duration-300 bg-violet-700 text-white text-sm font-medium rounded-md shadow-sm hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <div className="mt-6">
          <h3 className="text-lg leading-6 font-medium text-violet-900">
            Tasks
          </h3>
          <ul className="mt-2 space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="px-4 py-2 bg-violet-100 text-violet-900 rounded-md shadow-sm flex items-center justify-between"
              >
                {task}
              </li>
            ))}
          </ul>
        </div>
        <div className="actionBtn flex items-center justify-between">
          {loadingState ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <button
              className="mt-1 px-3 py-3 transform hover:scale-110 duration-300 bg-violet-700 text-white text-sm font-medium rounded-md shadow-sm hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              onClick={() => handleSubmitTasks()}
            >
              Submit Task
            </button>
          )}
          <button
            className="mt-1 px-3 py-3 transform hover:scale-110 duration-300 bg-red-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            onClick={() => handleClearForm()}
          >
            Reset Form
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateRoom;
