import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md w-full z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">
          <Link to="/" className="text-white hover:text-gray-300 transition-colors duration-300">
            Algorithm Visualizer
          </Link>
        </h1>
        <nav className="flex space-x-6">
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
