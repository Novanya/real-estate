import React from "react";
import Navbar from "./Navbar";
function Header() {
  return (
    <div
      className="min-h-screen min-w-full"
      style={{
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
     
      <div className="w-full h-auto flex justify-between">
        <div className="w-8/12 flex justify-between ">
          <Navbar />
        </div>
        <div className=" w-2/12 p-4 m-0 flex relative mt-10">
          <button className=" flex bg-blue-800 p-2.5 rounded font-bold text-white hover:bg-blue-400 duration-300">
            Get Started
          </button>
        </div>
      </div>
      <div className="w-full ">
        <h1
          className="font-extrabold text-right mb-28 mr-28 mt-30
               sm:m-0 sm:p-0 sm:text-4xl sm:text-center md:text-5xl md:mt-50
               md:mb-15 md:mr-28 md:text-right"
          style={{ textShadow: "2px 2px #0b1d4c" }}
        >
          Your Future Begins <br />
          at the Perfect Address
        </h1>
        <a href="#Projects" className=" flex justify-end mr-28">
          <button className="rounded bg-transparent border-3 border-black hover:scale-105 p-3 font-bold duration-500 sm:justify-center sm:items-center  md:justify-end">
            Explore More
          </button>
        </a>
      </div>
    </div>
  );
}

export default Header;
