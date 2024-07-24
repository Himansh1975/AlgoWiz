import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to the Algorithm Visualizer</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">Explore different algorithm visualizations to better understand how they work. Use the control buttons to start, stop, reset, and shuffle the visualizations.</p>
      </div>

      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <Link
            to="/pathfinding"
            className="relative inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md shadow overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-indigo-800"
          >
            <span className="relative z-10">Pathfinding Visualizer</span>
          </Link>
          <Link
            to="/sorting"
            className="relative inline-block px-6 py-3 text-lg font-semibold text-white bg-purple-500 rounded-md shadow overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-purple-700"
          >
            <span className="relative z-10">Sorting Visualizer</span>
          </Link>
        </div>

        <div className="text-center">
          <p className="mb-4">Select an algorithm visualizer from the navigation bar or the links above to get started.</p>
          <p className="mb-4">Use the control buttons to start, stop, reset, and shuffle the visualizations.</p>
          <p>Switch between different algorithms to see how they operate and compare their performance.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
