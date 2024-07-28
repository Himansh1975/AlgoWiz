import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sorting from './pages/Sorting';
import Pathfinding from './pages/Pathfinding';
import Backtracking from './pages/Backtracking';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <main className="flex-1 ml-0 md:ml-64 min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/pathfinding" element={<Pathfinding />} />
            <Route path="/backtracking" element={<Backtracking />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;