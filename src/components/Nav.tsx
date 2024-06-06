import React from "react";
import { Link } from "react-router-dom";

function Nav({ content, Path }: any) {
  return (
    <div className="flex flex-row items-center justify-between md:py-3 pt-3 md:px-10 px-3 border-b-2 border-gray-200">
      <div className="leftNav">
        <p className="font-extrabold transform hover:scale-110 duration-200 md:text-5xl text-3xl font-serif text-violet-700">
          <Link
            to="/"
            className="text-decoration-none text-violet-700 border-violet-400"
          >
            Collabo
          </Link>
        </p>
      </div>
      <div className="rightNav flex items-center justify-center mt-2 gap-2">
        <p className="border-0 transform hover:scale-105 duration-200 text-violet-700 hover:shadow-md rounded py-2 md:px-8 px-3 cursor-pointer hover:bg-slate-200 font-extrabold font-serif">
          HELLO DEVELOPER : {" "}
          {window.localStorage.getItem("TaskerUser")?.toLowerCase()}
        </p>
      </div>
      <p className="border-0 transform hover:scale-105 duration-200 text-violet-700 hover:shadow-md rounded py-2 md:px-8 px-3 cursor-pointer hover:bg-slate-200 font-extrabold font-serif">
        <Link to={Path} className="text-decoration-none">
          {content}
        </Link>
      </p>
    </div>
  );
}

export default Nav;
