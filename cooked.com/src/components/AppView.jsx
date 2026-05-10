import MakeDish from './Makedish';
import PlanDish from './PlanDish';

export default function AppView({ activeTab, onTabChange, onBackToLanding }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-green-950 to-black text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">

        {/* Logo */}
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-4 h-4 bg-orange-500 rounded-full shadow-md shadow-orange-500/30" />
          <span className="text-xl font-serif font-bold text-white tracking-tight">
            cooked<span className="text-orange-500">.com</span>
          </span>
        </button>

        {/* Tabs */}
        <div className="flex bg-zinc-800 p-1 rounded-lg">

          <button
            onClick={() => onTabChange('make')}
            className={`px-4 py-2 text-sm rounded-md transition ${
              activeTab === 'make'
                ? 'bg-orange-500 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Make
          </button>

          <button
            onClick={() => onTabChange('plan')}
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
      <main className="flex-1 w-full max-w-5xl mx-auto p-6">

        {activeTab === 'make' && (
          <div className="animate-fadeIn">
            <MakeDish />
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="animate-fadeIn">
            <PlanDish />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-zinc-800/50 mt-auto">
        <p className="text-zinc-500 text-sm">
          Powered by your pantry.
        </p>
      </footer>
    </div>
  );
}