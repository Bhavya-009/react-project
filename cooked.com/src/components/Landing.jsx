import { useState } from 'react';

export default function Landing({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white flex flex-col items-center justify-center px-6 py-10 relative">

      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-3 h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
        <span className="text-sm text-zinc-400 tracking-wider">cooked</span>
      </div>

      {/* Heading */}
      <div className="text-center max-w-xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          What are you <br />
          <span className="text-orange-400 italic">cooking</span> today?
        </h1>
        <p className="text-zinc-400 mt-4">
          Start with what you have OR plan what you want.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-5xl">

        {/* MAKE */}
        <button
          onMouseEnter={() => setHovered('make')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect('make')}
          className="relative w-full md:w-1/2 h-72 rounded-2xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=900"
            className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
              hovered === 'make' ? 'scale-110' : ''
            }`}
          />

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div>
              <h2 className="text-2xl font-semibold">Make a Dish</h2>
              <p className="text-sm text-zinc-300 mt-1">
                Use ingredients you already have.
              </p>
            </div>

            <div className="text-orange-400 font-medium">
              Get Recipes →
            </div>
          </div>
        </button>

        {/* OR */}
        <div className="text-zinc-500 text-sm font-semibold">OR</div>

        {/* PREPARE */}
        <button
          onMouseEnter={() => setHovered('prepare')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect('prepare')}
          className="relative w-full md:w-1/2 h-72 rounded-2xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src="https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=900"
            className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
              hovered === 'prepare' ? 'scale-110' : ''
            }`}
          />

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div>
              <h2 className="text-2xl font-semibold">Prepare for a Dish</h2>
              <p className="text-sm text-zinc-300 mt-1">
                Plan ingredients before cooking.
              </p>
            </div>

            <div className="text-orange-400 font-medium">
              Get Grocery List →
            </div>
          </div>
        </button>

      </div>

      {/* Footer */}
      <p className="text-zinc-500 text-sm mt-10">
        Powered by your pantry.
      </p>
    </div>
  );
}