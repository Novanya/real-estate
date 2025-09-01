import React from "react";
import { projectsData } from "../assets/assets.js";

function Completed() {
  return (
    <div className="w-full min-h-screen text-black text-center p-5 ">
      <div>
        <h1 className="text-5xl font-extrabold">Completed Projects</h1>
        <p className="flex flex-wrap justify-center mt-5 text-black">
          <em>
            A showcase of our successfully delivered real estate projects that
            reflect quality, trust, and innovation.
          </em>
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projectsData.map((info, index) => (
            <div
              className="hover:scale-105 hover:cursor-pointer transform duration-500 w-60 h-fit mb-2 mt-2 items-center m-auto bg-cyan-50 shadow-md shadow-blue-950 p-3"
              key={index}
            >
              <img src={info.image} className="w-70 h-45" alt="" />
              <div>
                <h1 className="font-bold">{info.title}</h1>
                <h3 className="font-semibold">{info.price}</h3>
                <h3>{info.location}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Completed;
