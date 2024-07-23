import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <h2 className="text-4xl font-bold">Welcome to Algorithm Visualizer</h2>
      <div className="flex space-x-4">
        <Link to="/sorting" className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 transition-all duration-200 text-white p-4 rounded-lg font-bold text-xl">
          Sorting Visualizer
        </Link>
        <Link to="/pathfinding" className="bg-green-500 hover:bg-green-400 active:bg-green-600 transition-all duration-200 text-white p-4 rounded-lg font-bold text-xl">
          Pathfinding Visualizer
        </Link>
      </div>
    </div>
  );
};

export default Home;
