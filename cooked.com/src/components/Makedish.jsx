import { useState, useRef } from 'react';
import { findRecipes } from '../data/recipes';

const CATEGORY_COLORS = {
  Easy: '#16a34a',
  Medium: '#d97706',
  Hard: '#dc2626',
};

export default function MakeDish() {
  const [input, setInput] = useState(''); // user input in text field
  const [results, setResults] = useState(null); // will be store with recipes
  const [loading, setLoading] = useState(false); // loading state - animation
  const [tags, setTags] = useState([]); // user entered tags 
  const [diet, setDiet] = useState('all'); // diet type - all, veg, non-veg
  const [sortBy, setSortBy] = useState('match'); // sort by - match, time, calories

  const inputRef = useRef(null);

  const addTag = (val) => {
    const trimmed = val.replace(/,/g, '').trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((p) => [...p, trimmed]);
    }
    setInput('');
  };

  // remove tag when clicked on x button
  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  // handle key down event
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault(); // stop page to refresh

      if (input.trim()) {
        addTag(input);
      }
    }
    if (e.key === 'Backspace' && !input && tags.length) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  // main search function
  const handleSearch = () => {
    if (!tags.length && !input.trim()) return; //if no ingredients -> no searching

    const allIngredients = [
      ...tags,
      ...(input.trim() ? [input.trim()] : []),
    ].join(', '); // combine all ingredients into single string

    setLoading(true);
    setResults(null); // clear previous results

    setTimeout(() => {
      let found = findRecipes(allIngredients);

      if (diet !== 'all') {
        found = found.filter((r) => r.dietType === diet);
      }

      found.sort((a, b) => {
        if (sortBy === 'time') {
          return a.timeMinutes - b.timeMinutes; // lesser cooking time to appear first
        }

        if (sortBy === 'calories') {
          return a.caloriesNum - b.caloriesNum; // lesser calorie to appear first
        }

        // percentage of matched ingredients
        if (sortBy === 'match') {
          const aMatch =
            (a.matchedIngredients.length /
              (a.matchedIngredients.length + a.extraIngredients.length)) * 100;
          const bMatch =
            (b.matchedIngredients.length /
              (b.matchedIngredients.length + b.extraIngredients.length)) * 100;
          return bMatch - aMatch;
        }
        return 0;
      });

      setResults(found.length ? found : []);
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">What's in your kitchen?</h2>
        <p className="text-zinc-400 mt-2">
          Add your ingredients below and we'll find recipes you can make right now.
        </p>
      </div>

      <div
        className="w-full max-w-2xl bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 cursor-text hover:border-zinc-600 transition"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-zinc-700 text-sm rounded-md flex items-center gap-2">
              {tag}
              <button
                className="hover:text-red-400 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                ×
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-white placeholder-zinc-500"
            placeholder={
              tags.length === 0
                ? 'e.g. cheese, garlic, tomato...'
                : 'Add more...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (input.trim()) addTag(input);
            }}
          />
        </div>

        <div className="text-xs text-zinc-500 mt-3">
          Press Enter or comma to add each ingredient
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-4 text-sm w-full max-w-2xl px-1">
        <div className="flex items-center gap-2">
          <label className="text-zinc-400 font-medium">Diet:</label>
          <select
            className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-1.5 outline-none focus:border-orange-500 transition cursor-pointer"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          >
            <option value="all">All</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-zinc-400 font-medium">Sort by:</label>
          <select
            className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-1.5 outline-none focus:border-orange-500 transition cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="match">Best Match</option>
            <option value="time">Cooking Time</option>
            <option value="calories">Calories</option>
          </select>
        </div>
      </div>

      <button
        className={`mt-6 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
          tags.length || input.trim()
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
        }`}
        onClick={handleSearch}
        disabled={loading || (!tags.length && !input.trim())}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            Finding recipes...
          </span>
        ) : (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Find Recipes
          </>
        )}
      </button>

      {results !== null && (
        <div className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.length > 0 ? (
            results.map((recipe, idx) => (
              <div key={idx} className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 hover:border-zinc-500 transition group">
                <div className="relative h-48">
                  <img src={recipe.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-medium" style={{ color: CATEGORY_COLORS[recipe.difficulty] || CATEGORY_COLORS.Medium }}>
                    {recipe.difficulty}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{recipe.title}</h3>
                  <div className="flex gap-4 text-xs text-zinc-400 mt-3">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {recipe.timeMinutes} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      {recipe.caloriesNum} cal
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-zinc-300 mb-2">You have {recipe.matchedIngredients?.length || 0} / {(recipe.matchedIngredients?.length || 0) + (recipe.extraIngredients?.length || 0)} ingredients</div>
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.matchedIngredients?.map(i => <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">{i}</span>)}
                      {recipe.extraIngredients?.map(i => <span key={i} className="px-2 py-1 bg-zinc-700 text-zinc-400 text-xs rounded">{i}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-10 text-zinc-500">
              No recipes found for these ingredients. Try adding more!
            </div>
          )}
        </div>
      )}
    </div>
  );
}