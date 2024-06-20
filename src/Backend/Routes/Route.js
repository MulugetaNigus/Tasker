// import the express packages
const express = require("express");

// import the diff kind of functions to make the api call
const {
  addTask,
  getTask,
  getDevArea,
  updateTask,
  userReg,
  userLogin,
  deleteRoom,
} = require("../Controller/TaskController");

// init the router cames from the express packages
const route = express.Router();

// a collections of routes
route.post("/add", addTask);
route.get("/getTask", getTask);
route.get("/search", getDevArea);
route.put("/updateTask/:id", updateTask);
route.delete("/delete" , deleteRoom)
route.post("/register", userReg);
route.post("/login", userLogin);

// export the route file
module.exports = route;
