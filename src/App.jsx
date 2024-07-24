import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Sorting from './pages/Sorting';
import Pathfinding from './pages/Pathfinding';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              <Link to="/" className="text-white hover:text-gray-300">Algorithm Visualizer</Link>
            </h1>
            <nav className="space-x-4">
              <Link to="/sorting" className="text-white hover:text-gray-300">Sorting</Link>
              <Link to="/pathfinding" className="text-white hover:text-gray-300">Pathfinding</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/pathfinding" element={<Pathfinding />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;