import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../redux/actions";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.mode);
  return (
    <nav
      className={`fixed top-0 left-0 z-40 rounded bg-gray-500 text-white h-full p-4 pt-10 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out ${
        darkMode ? "dark" : ""
      }`}
    >
      <button className="absolute top-4 right-4" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <ul role="list" class="divide-y divide-gray-100">
        <li class="flex justify-start gap-x-6 py-5">
          <a href="/" className="text-white">
            Home
          </a>
        </li>
        <li class="flex justify-start gap-x-6 py-5">
          <a href="/exchange-rates" className="text-white pr-16">
            Live Exchange Rates
          </a>
        </li>
        <li className=" py-5">
          <button
            className={`ml-auto px-4 py-2 rounded ${
              darkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-white"
            }`}
            onClick={() => dispatch(setDarkMode(!darkMode))}
          >
            {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
