import MakeDish from './MakeDish';
import PrepareDish from './PrepareDish';

export default function AppView({ activeTab, onTabChange, onBackToLanding }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">

        {/* Logo */}
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-sm text-zinc-400 tracking-wider">
            mise en place
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
            onClick={() => onTabChange('prepare')}
            className={`px-4 py-2 text-sm rounded-md transition ${
              activeTab === 'prepare'
                ? 'bg-orange-500 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Prepare
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

        {activeTab === 'prepare' && (
          <div className="animate-fadeIn">
            <PrepareDish />
          </div>
        )}

      </main>
    </div>
  );
}