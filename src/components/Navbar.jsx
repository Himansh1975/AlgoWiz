import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">
          <Link to="/" className="text-white hover:text-gray-300 transition-colors duration-300">
            Algorithm Visualizer
          </Link>
        </h1>
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
        <nav className={`sm:flex space-x-6 ${isOpen ? "block" : "hidden"} sm:block`}>
          <NavLink to="/sorting" label="Sorting" />
          <NavLink to="/pathfinding" label="Pathfinding" />
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="relative text-lg px-4 py-2 font-medium group">
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out"></span>
    <span className="relative z-10">{label}</span>
  </Link>
);

export default Navbar;
