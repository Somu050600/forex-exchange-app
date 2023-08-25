import React, { useEffect, useState } from "react";
import "./Header.css";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../redux/actions";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768);

  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.mode);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    setIsDesktopView(window.innerWidth >= 768);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header className="bg-blue-500 text-white p-4  flex justify-between items-center">
      <div className="flex flex-row">
        <button className="block lg:hidden text-white" onClick={toggleSidebar}>
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <a href="/" className="pl-4 text-2xl font-semibold text-white">
          Forex Exchange App
        </a>
      </div>
      <div className="text-white pr-10">
        {isDesktopView ? (
          <nav className="bg-blue-500 text-white p-4 space-x-4">
            <a href="/" className="text-white p-10">
              Home
            </a>
            <a href="/exchange-rates" className="text-white">
              Exchange Rate Display
            </a>
            <button
              className={`ml-auto px-4 py-2 rounded ${
                darkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() => dispatch(setDarkMode(!darkMode))}
            >
              {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
            </button>
          </nav>
        ) : (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
      </div>
    </header>
  );
};

export default Header;
