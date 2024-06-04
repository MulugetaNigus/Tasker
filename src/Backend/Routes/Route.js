const express = require("express");
const {
  addTask,
  getTask,
  getDevArea,
  updateTask,
  userReg,
  userLogin,
} = require("../Controller/TaskController");

// init the router cames from the express packages
const route = express.Router();

// routes
route.post("/add", addTask);
route.get("/getTask", getTask);
route.get("/search", getDevArea);
route.put("/updateTask/:id", updateTask);
route.post("/register", userReg);
route.post("/login", userLogin);

module.exports = route;
