import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import makePic from '../assets/make-pic.jpg';
import planPic from '../assets/plan-pic.jpg';

export default function Landing() {
  const [hovered, setHovered] = useState(null);
  const [transitioning, setTransitioning] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardClick = (target) => {
    setTransitioning(target);
    setTimeout(() => {
      navigate(`/${target}`);
    }, 850);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-green-950 to-black text-white flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden perspective-3d">

      {/* Logo */}
      <div className={`flex items-center gap-2 transition-all duration-500 ${transitioning ? 'door-header-fade' : ''} relative md:absolute md:top-6 md:left-6 self-start md:self-auto mb-8 md:mb-0`}>
        <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
        <span className="text-2xl font-serif font-bold text-white tracking-tight">
          cooked<span className="text-orange-500">.com</span>
        </span>
      </div>

      {/* Heading */}
      <div className={`text-center max-w-xl mb-8 md:mb-12 transition-all duration-500 ${transitioning ? 'door-header-fade' : ''}`}>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          What are you <br />
          <span className="text-orange-400 italic">cooking</span> today?
        </h1>
        <p className="text-zinc-400 mt-4">
          Start with what you have OR plan what you want.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-5xl preserve-3d">

        {/* MAKE */}
        <button
          onMouseEnter={() => !transitioning && setHovered('make')}
          onMouseLeave={() => !transitioning && setHovered(null)}
          onMouseMove={handleMouseMove}
          onClick={() => !transitioning && handleCardClick('make')}
          className={`relative w-full md:w-1/2 h-52 md:h-72 rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] cursor-pointer preserve-3d ${
            transitioning === 'make'
              ? (isMobile ? 'door-swing-up' : 'door-swing-left')
              : transitioning === 'plan'
              ? 'door-fade-out pointer-events-none'
              : ''
          }`}
        >
          <img
            src={makePic}
            className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
              hovered === 'make' ? 'scale-110' : ''
            }`}
          />

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

          {/* Spotlight Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(249, 115, 22, 0.3), transparent 40%)',
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Make a Dish</h2>
              <p className="text-md text-zinc-300 mt-1">
                Use ingredients you already have.
              </p>
            </div>

            <div className="text-orange-400 font-medium text-center">
              Get Recipes →
            </div>
          </div>
        </button>

        {/* OR */}
        <div className={`text-zinc-500 text-xl font-semibold transition-all duration-500 ${transitioning ? 'door-fade-out' : ''}`}>OR</div>

        {/* PLAN */}
        <button
          onMouseEnter={() => !transitioning && setHovered('plan')}
          onMouseLeave={() => !transitioning && setHovered(null)}
          onMouseMove={handleMouseMove}
          onClick={() => !transitioning && handleCardClick('plan')}
          className={`relative w-full md:w-1/2 h-52 md:h-72 rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] cursor-pointer preserve-3d ${
            transitioning === 'plan'
              ? (isMobile ? 'door-swing-down' : 'door-swing-right')
              : transitioning === 'make'
              ? 'door-fade-out pointer-events-none'
              : ''
          }`}
        >
          <img
            src={planPic}
            className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
              hovered === 'plan' ? 'scale-110' : ''
            }`}
          />

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />
          
          {/* Spotlight Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(249, 115, 22, 0.3), transparent 40%)',
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Plan a Dish</h2>
              <p className="text-md text-zinc-300 mt-1">
                Plan ingredients before cooking.
              </p>
            </div>

            <div className="text-orange-400 font-medium text-center">
              Get Grocery List →
            </div>
          </div>
        </button>

        {/* Closing Cards Container */}
      </div>

      {/* Footer */}
      <p className={`text-zinc-500 text-sm mt-10 transition-all duration-500 ${transitioning ? 'door-header-fade' : ''}`}>
        Built by Bhavya Lakhani | <a href="https://github.com/Bhavya-009/react-project" className="text-orange-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub </a>
        | <a href="https://www.linkedin.com/in/bhavya-lakhani-profile/" className="text-orange-500 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </div>
  );
}
