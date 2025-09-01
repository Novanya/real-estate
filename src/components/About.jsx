import React from "react";
import asset from "../assets/brand.jpeg";

function About() {
  return (
    <div id="About" className="min-h-screen w-auto text-black items-center m-auto">
      <div className="w-full text-center sm:mr-0 sm:ml-0 sm:pr-0 sm:pl-0 mt-5 md:p-10 ">
        <h1 className=" text-center font-extrabold text-5xl">About Us</h1>
        <div className="text-center md:m-4 ">
          <p>
            <em>
              Expert guidance, personalized service, and exceptional results...
            </em>
          </p>
        </div>
        <div className="flex flex-col sm:text-center md:flex-row  lg:flex-row">
          <div className="flex w-2/3">
            <img
              src={asset}
              alt="logo"
              className="md:w-md lg:w-md rounded m-10  sm:w-sm"
            />
          </div>
          <div className="flex flex-col gap-10 font-bold mt-15 w-1/3 ">
            <div>
              <span>
                <span className="text-3xl">3+</span> <br />{" "}
                <span>Years Experience</span>
              </span>
            </div>
            <div>
              <span>
                <span className="text-3xl ">500+</span> <br />
                <span>Projects Completed</span>
              </span>
            </div>
            <div>
              <span>
                <span className="text-3xl">10+</span>
                <br />
                <span>No. of Winning Awards</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
