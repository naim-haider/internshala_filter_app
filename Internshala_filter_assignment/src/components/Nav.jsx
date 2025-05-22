import React from "react";

const Nav = () => {
  return (
    <div>
      <nav className="flex justify-between px-20 py-5 items-center bg-white">
        <h1>
          <img className="h-8" src="./internshala_logo.png" alt="logo" />
        </h1>
        <div className="flex items-center">
          <ul className="flex items-center space-x-6">
            <li className="font-semibold text-gray-700">
              Internships <i class="fa-solid fa-caret-down"></i>
            </li>
            <li className="font-semibold text-gray-700">
              Courses{" "}
              <span className="text-xs text-white py-0.5 px-1.5 rounded-sm font-bold bg-[#ff8c00]">
                OFFER
              </span>
              <i className="fa-solid fa-caret-down ml-1"></i>
            </li>
            <li>
              Jobs <i className="fa-solid fa-caret-down ml-1"></i>
            </li>
            <li>
              <i className="fa-regular fa-comment-dots text-xl"></i>
            </li>
            <li className="flex items-center">
              <div className="border rounded-full px-1.5  border-gray-700">
                <span className="text-sm">N</span>
              </div>
              <i className="fa-solid fa-caret-down ml-1.5"></i>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
