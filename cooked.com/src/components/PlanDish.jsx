import { useState } from 'react';
import { findDish } from '../data/dishes';

const CATEGORY_ORDER = [
  'Produce',
  'Protein',
  'Dairy',
  'Pantry',
  'Spices',
  'Other',
];

const CATEGORY_ICONS = {
  Produce: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Protein: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    </svg>
  ),
  Dairy: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2h8l2 7H6L8 2z" />
      <path d="M6 9v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" />
    </svg>
  ),
  Pantry: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
    </svg>
  ),
  Spices: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    </svg>
  ),
  Other: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export default function PlanDish() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(new Set());

  const handleSearch = () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);
    setChecked(new Set());

    setTimeout(() => {
      setResult(findDish(input));
      setLoading(false);
    }, 1400);
  };

  const toggleCheck = (name) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const grouped = result ? groupByCategory(result.items) : {};
  const total = result?.items.length ?? 0;
  const done = checked.size;
  const progress = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">What do you want to cook?</h2>
        <p className="text-zinc-400 mt-2">
          Enter a dish name and get a complete grocery list to shop for.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 focus-within:border-zinc-500 transition">
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-zinc-400">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
          <input
            className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500"
            placeholder="e.g. Spaghetti Carbonara, Beef Tacos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>

      <button
        className={`mt-6 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
          input.trim()
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
        }`}
        onClick={handleSearch}
        disabled={loading || !input.trim()}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            Building grocery list...
          </span>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12h6M9 16h4" />
            </svg>
            Build Grocery List
          </>
        )}
      </button>

      {result && (
        <div className="w-full max-w-2xl mt-12 mb-20 animate-fadeIn">
          <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8 border border-zinc-800 shadow-2xl">
            <img src={result.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'} alt={result.dish} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-2xl font-bold text-white mb-2">{result.dish}</h3>
              <p className="text-zinc-300 text-sm mb-3 max-w-md">{result.description}</p>
              <div className="flex gap-4 text-xs font-medium text-orange-400">
                <span>{result.time}</span>
                <span>Serves {result.servings}</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-zinc-200">Shopping Progress</span>
              <span className="text-sm font-medium text-orange-400">{done} / {total} items</span>
            </div>
            <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="grid gap-6">
            {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((category) => (
              <div key={category} className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-zinc-700/50">
                  <span className="text-zinc-400">{CATEGORY_ICONS[category]}</span>
                  <span className="font-medium text-zinc-200">{category}</span>
                  <span className="ml-auto text-xs font-medium text-zinc-500 bg-zinc-700/50 px-2 py-0.5 rounded-full">
                    {grouped[category].length}
                  </span>
                </div>
                <div className="p-2">
                  {grouped[category].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => toggleCheck(item.name)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-700/50 transition group text-left"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition ${checked.has(item.name) ? 'bg-orange-500 border-orange-500 text-white' : 'border-zinc-500 text-transparent group-hover:border-zinc-400'}`}>
                        {checked.has(item.name) && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`flex-1 transition ${checked.has(item.name) ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                        {item.name}
                      </span>
                      <span className={`text-sm transition ${checked.has(item.name) ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {item.amount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {done === total && total > 0 && (
            <div className="mt-8 flex items-center justify-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 py-4 rounded-xl font-medium animate-fadeIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              You're all set — happy cooking!
            </div>
          )}
        </div>
      )}
    </div>
  );
}