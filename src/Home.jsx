import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaRoute, FaPlay, FaStop, FaRedo, FaRandom } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white p-6">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-6 animate-pulse">
          Algorithm Visualizer
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Dive into the world of algorithms! Explore and visualize different algorithms to grasp their inner workings. Use our interactive controls to manipulate the visualizations in real-time.
        </p>
      </div>
      
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-2xl w-full max-w-3xl backdrop-filter backdrop-blur-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <VisualizerLink
            to="/pathfinding"
            title="Pathfinding Visualizer"
            icon={<FaRoute className="text-3xl mb-2" />}
            bgColor="from-blue-600 to-cyan-400"
          />
          <VisualizerLink
            to="/sorting"
            title="Sorting Visualizer"
            icon={<FaChartBar className="text-3xl mb-2 relative top-1" />}
            bgColor="from-purple-600 to-pink-400"
          />
        </div>
        
        <div className="text-center space-y-6">
          <p className="text-lg">Choose a visualizer above or from the navigation bar to begin your journey.</p>
          <div className="flex justify-center space-x-4">
            <ControlButton icon={<FaPlay />} label="Start" />
            <ControlButton icon={<FaStop />} label="Stop" />
            <ControlButton icon={<FaRedo />} label="Reset" />
            <ControlButton icon={<FaRandom />} label="Shuffle" />
          </div>
          <p className="mt-6 text-sm text-gray-300">
            Experiment with different algorithms to observe their behavior and compare their efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

const VisualizerLink = ({ to, title, icon, bgColor }) => (
  <Link
    to={to}
    className={`group relative overflow-hidden rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-75 group-hover:opacity-100 transition-opacity duration-300`}></div>
    <div className="relative z-10 flex items-center justify-center space-x-2">
  {icon}
  <h2 className="text-2xl font-semibold">{title}</h2>
</div>
  </Link>
);

const ControlButton = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
    {icon}
    <span className="mt-1 text-xs">{label}</span>
  </button>
);

export default Home;