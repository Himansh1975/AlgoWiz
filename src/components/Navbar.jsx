import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaRoute } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg w-full z-50 sticky top-0">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-indigo-300 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.649 3.084A1 1 0 015.163 4.4 13.95 13.95 0 004 10c0 1.993.416 3.886 1.164 5.6a1 1 0 01-1.832.8A15.95 15.95 0 012 10c0-2.274.475-4.44 1.332-6.4a1 1 0 011.317-.516zM12.96 7a3 3 0 00-2.342 1.126l-.328.41-.111-.279A2 2 0 008.323 7H8a1 1 0 000 2h.323l.532 1.33-1.035 1.295a1 1 0 01-.781.375H7a1 1 0 100 2h.039a3 3 0 002.342-1.126l.328-.41.111.279A2 2 0 0011.677 14H12a1 1 0 100-2h-.323l-.532-1.33 1.035-1.295A1 1 0 0112.961 9H13a1 1 0 100-2h-.039zm1.874-2.6a1 1 0 011.833-.8A15.95 15.95 0 0118 10c0 2.274-.475 4.44-1.332 6.4a1 1 0 11-1.832-.8A13.949 13.949 0 0016 10c0-1.993-.416-3.886-1.165-5.6z" clipRule="evenodd" />
            </svg>
            <span>Algorithm Visualizer</span>
          </Link>
        </h1>
        <nav className="flex space-x-4">
          <NavLink to="/sorting" label="Sorting" icon={<FaChartBar />} />
          <NavLink to="/pathfinding" label="Pathfinding" icon={<FaRoute />} />
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, label, icon }) => (
  <Link
    to={to}
    className="relative text-lg px-4 py-2 font-medium group flex items-center space-x-2 overflow-hidden rounded-lg"
  >
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></span>
    <span className="relative z-10 flex items-center space-x-2">
      {icon}
      <span>{label}</span>
    </span>
    <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
  </Link>
);

export default Navbar;