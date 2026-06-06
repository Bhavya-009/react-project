import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import MakeDish from './components/Makedish';
import PlanDish from './components/PlanDish';

function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes('/plan') ? 'plan' : 'make';

  const [slideDirection, setSlideDirection] = useState('fade-in');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      if (prevPathRef.current === '/make' && location.pathname === '/plan') {
        setSlideDirection('slide-left');
      } else if (prevPathRef.current === '/plan' && location.pathname === '/make') {
        setSlideDirection('slide-right');
      } else {
        setSlideDirection('fade-in');
      }
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-green-950 to-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
          <span className="text-2xl font-serif font-bold text-white tracking-tight">
            cooked<span className="text-orange-500">.com</span>
          </span>
        </button>

        {/* Tabs */}
        <div className="flex bg-zinc-800 p-1 rounded-lg">
          <button
            onClick={() => navigate('/make')}
            className={`px-4 py-2 text-sm rounded-md transition ${
              activeTab === 'make'
                ? 'bg-orange-500 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Make
          </button>
          <button
            onClick={() => navigate('/plan')}
            className={`px-4 py-2 text-sm rounded-md transition ${
              activeTab === 'plan'
                ? 'bg-orange-500 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Plan
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-6 overflow-x-hidden">
        <div key={location.pathname} className={slideDirection}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <p className={`text-zinc-500 text-sm text-center mt-10 transition-all duration-500`}>
        Built by Bhavya Lakhani | <a href="https://github.com/Bhavya-009/react-project" className="text-orange-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub </a>
        | <a href="https://www.linkedin.com/in/bhavya-lakhani-profile/" className="text-orange-500 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/make" element={<MainLayout><MakeDish /></MainLayout>} />
        <Route path="/plan" element={<MainLayout><PlanDish /></MainLayout>} />
      </Routes>
    </Router>
  );
}