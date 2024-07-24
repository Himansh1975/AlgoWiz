import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sorting from './pages/Sorting';
import Pathfinding from './pages/Pathfinding';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
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