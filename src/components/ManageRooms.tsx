import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import { ITask } from "../Types/App.Type";
import Spinner from "react-bootstrap/Spinner";

const ManageRooms = () => {
  // container to hold the values
  const [rooms, setRooms] = useState<ITask[]>([]);
  const [Urooms, setURooms] = useState<string>();
  const [loading, setloading] = useState(false);

  // get all task and filter out
  const gethandleTaks = async () => {
    // start the loading simulations
    setloading(true);

    // to simulate the loading state we just add 3 sec
    setTimeout(async () => {
      try {
        await axios
          .get("http://localhost:3001/api/v1/getTask")
          .then((result) => {
            // stop loading simulation
            setloading(false);

            //   console.log(result.data.GetTask);
            const data = result.data.GetTask;

            //  here we can filter out the value
            const getSearchRoom = data.filter(
              (d: ITask) => d.roomID === Urooms
            );

            // check if the search value exist
            if (!getSearchRoom) {
              return console.log(
                "there is no matched room id with : " + Urooms
              );
            }
            // return console.log(getSearchRoom);
            return setRooms(getSearchRoom);
          })
          .then((err) => {
            // stop loading simulation
            setloading(false);
            return console.log(err);
          });
      } catch (error: any) {
        // stop loading simulation
        setloading(false);
        console.log(error.message);
      }
    }, 3000);
  };

  return (
    <div>
      {/* navigation section here */}
      <Nav content="Home" Path="/tasker" />

      {/* main part here */}
      <div className="search flex flex-column items-center justify-center mt-20">
        <p className="font-extrabold text-violet-600 text-start font-serif md:text-5xl text-3xl mb-2">
          Find Your Favorite Rooms
        </p>
        <div className="mainPart flex flex-row items-center justify-center w-full gap-4">
          <input
            type="text"
            className="border-2 rounded-md border-violet-300 md:w-2/6 p-3 placeholder:text-violet-500 placeholder-violet-300"
            placeholder="enter the romm numbers"
            onChange={(e) => setURooms(e.target.value)}
            value={Urooms}
          />
          <b
            className="border-1 text-white rounded py-3 px-10 cursor-pointer transition hover:scale-110 ease-out duration-300 bg-violet-700 font-extrabold font-serif"
            onClick={() => gethandleTaks()}
          >
            search
          </b>
        </div>
      </div>

      {/* rooms detail */}
      {rooms &&
        rooms.map((roomData) => (
          <div className="flex items-center justify-center">
            <p>{roomData.roomID}</p>
          </div>
        ))}
      {loading && (
        <div className="flex items-center justify-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* footer section here */}
      <Footer />
    </div>
  );
};

export default ManageRooms;
