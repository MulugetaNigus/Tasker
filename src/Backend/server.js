const express = require("express");
const cors = require("cors");
const DBConnection = require("./utils/DBConn");
const route = require("./Routes/Route");
const app = express();
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", route);

// env file
const port = process.env.PORT || 8000;

// app listening start here
app.listen(port, () => {
  // db connections
  DBConnection();
  // if port succesfullly connected
  console.log("app running on port: " + port);
});
