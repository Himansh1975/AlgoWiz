import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaRoute, FaChessQueen, FaBars, FaTimes, FaHome, FaGithub, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 dark:bg-gray-700 text-white p-2 rounded-md transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform hover:scale-110"
        onClick={toggleNav}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <nav className={`
        fixed left-0 top-0 bottom-0 z-40
        w-64 bg-gray-900 dark:bg-gray-800 text-white
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 shadow-2xl
      `}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-800 dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-indigo-300 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.649 3.084A1 1 0 015.163 4.4 13.95 13.95 0 004 10c0 1.993.416 3.886 1.164 5.6a1 1 0 01-1.832.8A15.95 15.95 0 012 10c0-2.274.475-4.44 1.332-6.4a1 1 0 011.317-.516zM12.96 7a3 3 0 00-2.342 1.126l-.328.41-.111-.279A2 2 0 008.323 7H8a1 1 0 000 2h.323l.532 1.33-1.035 1.295a1 1 0 01-.781.375H7a1 1 0 100 2h.039a3 3 0 002.342-1.126l.328-.41.111.279A2 2 0 0011.677 14H12a1 1 0 100-2h-.323l-.532-1.33 1.035-1.295A1 1 0 0112.961 9H13a1 1 0 100-2h-.039zm1.874-2.6a1 1 0 011.833-.8A15.95 15.95 0 0118 10c0 2.274-.475 4.44-1.332 6.4a1 1 0 11-1.832-.8A13.949 13.949 0 0016 10c0-1.993-.416-3.886-1.165-5.6z" clipRule="evenodd" />
              </svg>
              <span className="text-2xl font-bold">Algorithm Visualizer</span>
            </Link>
          </div>
          <div className="flex-grow py-8 flex flex-col space-y-1 overflow-y-auto">
            <NavLink to="/" label="Home" icon={<FaHome />} />
            <NavLink to="/sorting" label="Sorting" icon={<FaChartBar />} />
            <NavLink to="/pathfinding" label="Pathfinding" icon={<FaRoute />} />
            <NavLink to="/backtracking" label="Backtracking" icon={<FaChessQueen />} />
          </div>
          <div className="p-5 border-t border-gray-800 dark:border-gray-700 space-y-4">
            <a 
              href="https://github.com/himansh1975/algowiz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={20} />
              <span>View on GitHub</span>
            </a>
            <button 
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
          <div className="p-5 text-sm text-gray-400">
            <p>© 2024 Algorithm Visualizer</p>
          </div>
        </div>
      </nav>
    </>
  );
};

const NavLink = ({ to, label, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center space-x-3 px-5 py-3 transition-all duration-200
        ${isActive
          ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-md'
          : 'text-gray-300 hover:bg-indigo-800 dark:hover:bg-indigo-900 hover:text-white'}
        rounded-r-full mr-4 group relative overflow-hidden
      `}
    >
      <div className={`
        ${isActive ? 'text-white' : 'text-indigo-400 group-hover:text-white'}
        transition-colors duration-200 z-10
      `}>
        {icon}
      </div>
      <span className="font-medium z-10">{label}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Link>
  );
};

export default Navbar;