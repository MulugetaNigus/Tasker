import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import { ITask } from "../Types/App.Type";

let newTask: string[] = [];
const userID = window.localStorage.getItem("TaskerUser");

const CardArea = () => {
  // load the hole task and filter our the desire one
  const [allTasks, setallTasks] = useState<ITask[]>([]);
  const [mainTasks, setmainTasks] = useState([]);
  const [originalLength, setoriginalLength] = useState<boolean>(false);
  const [UniqueUser, setUniqueUser] = useState();

  useEffect(() => {
    // get the roomid from the localstorages
    const ROOMID = window.localStorage.getItem("devArea");
    // use useEffect hook to load the tasks
    const getAllTask = async () => {
      await axios
        .get(`http://localhost:3001/api/v1/search?roomID=${ROOMID}`)
        .then((response) => {
          console.log(response.data.filterOut);
          setallTasks(response.data.filterOut);
          response.data.filterOut.map((u: ITask) => {
            if (userID === u.devName) {
              u.allowUpdate = true;
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAllTask();
  }, []);

  // update the status
  const handleUpdateStatus = async (
    e: React.MouseEvent<HTMLDivElement>,
    task: any
  ) => {
    let updateIndex = parseInt(newTask.join("")[0]);
    task.tasks[updateIndex] = newTask[0].replace(updateIndex.toString(), "");
    console.log(
      newTask.map((r: string) => {
        newTask.push(r.slice(1));
      })
    );
    for (let index = 0; index <= newTask.length - 1 / 2; index++) {
      newTask.shift();
    }
    try {
      await axios
        .put(`http://localhost:3001/api/v1/updateTask/${task._id}`, {
          tasks: newTask,
        })
        .then((response) => {
          alert("task updated !");
          newTask = [];
          setoriginalLength(true);
          window.location.reload();
        })
        .catch((error) => {
          alert("task did not updated !");
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* navigation */}
      <Nav />

      {/* main part */}
      <div className="tasks grid items-center md:justify-evenly m-8 gap-3 md:grid-cols-3 mt-10 md:m-10">
        {/* map here and generate differnt cards here, for now make it static */}
        {allTasks &&
          allTasks.map((task) => (
            <div className="task border-2 h-full border-black bg-gray-900 rounded-md shadow-md p-3 duration-300">
              <h1 className="font-bold text-white text-6xl mb-4">
                {task.techStack}
              </h1>
              <b className="text-white font-light border-2 border-gray-100 p-2 rounded fs-6">
                {task.devName}
              </b>
              <hr />
              <h3 className="text-white font-extrabold mt-3">Lists Of Tasks</h3>

              <div className="listoftask flex flex-col items-start justify-start">
                {task.tasks &&
                  task.tasks.map((singleTask, index) => (
                    <>
                      <label className="form-check-label text-white text-xl">
                        {singleTask}
                      </label>
                      {/* {
                      index > 0 &&( */}
                      {/* <div className="form-check">
                        {task.allowUpdate === true ? (
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckIndeterminate"
                            onClick={() =>
                              newTask.push(index + "👍" + singleTask)
                            }
                          />
                        ) : (
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckIndeterminate"
                            onClick={() =>
                              newTask.push(index + "👍" + singleTask)
                            }
                            disabled
                          />
                        )}

                      </div> */}
                      {/* // )} */}
                    </>
                  ))}
              </div>
              {/* action btn */}
              {/* {task.allowUpdate === true ? (
                <div
                  className="actBtn flex items-start justify-start mt-8"
                  onClick={(e) => handleUpdateStatus(e, task)}
                >
                  <b className="border-1 text-black rounded py-3 md:px-10 px-5 cursor-pointer transition hover:scale-110 ease-out duration-300 bg-white border-2 border-white font-extrabold font-serif">
                    Update My Status
                  </b>
                </div>
              ) : (
                <div
                  className="actBtn flex items-start justify-start mt-8"
                  onClick={(e) => alert(`you can not update ${task.devName} Task !`)}
                >
                  <p className="border-1 text-black rounded py-3 md:px-10 px-5 cursor-pointer transition hover:scale-110 ease-out duration-300 bg-white border-2 border-white font-extrabold font-serif">
                    updatation not allowed !
                  </p>
                </div>
              )} */}
            </div>
          ))}
      </div>
      {/* footer */}
      <Footer />
    </>
  );
};

export default CardArea;
