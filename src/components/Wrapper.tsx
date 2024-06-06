import React from "react";

// tasker importation
import Nav from "./Nav"
import Home from "./Home"
import Fotter from "./Footer"

const  Wrapper = () => {
  return (
    <>
      <Nav content="Browse Rooms" Path="/rooms"/>
      <Home />
      <Fotter />
    </>
  );
}

export default Wrapper;
