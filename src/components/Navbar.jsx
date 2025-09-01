import React from "react";

function Navbar() {
  return (
    <div id="Nav" className="p-4 absolute top-0 w-full z-10 bg-transparent">
      <div className="flex justify-center space-x-8 text-xl font-bold">
        <a
          href="#Nav"
          className="text-white no-underline visited:text-white hover:text-gray-300 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="#About"
          className="text-white no-underline visited:text-white hover:text-gray-300 transition-colors duration-300"
        >
          About
        </a>
        <a
          href="#Contact"
          className="text-white no-underline visited:text-white hover:text-gray-300 transition-colors duration-300"
        >
          Contact Us
        </a>
        <a
          href="#Projects"
          className="text-white no-underline visited:text-white hover:text-gray-300 transition-colors duration-300"
        >
          Projects
        </a>
      </div>
    </div>
  );
}

export default Navbar;
