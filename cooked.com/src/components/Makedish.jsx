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

  const inputRef = useRef(null); // focus on input field automatically

  // add tag from input field
  const addTag = (val) => {
    const trimmed = val.replace(/,/g, '').trim(); // remove comma and trim whitespace

    // not empty and not duplicate
    if (trimmed && !tags.includes(trimmed)) { 
      setTags((p) => [...p, trimmed]); // add new ingredient to array
    }

    setInput(''); // clear input
  };

  // remove tag when clicked on x button
  const removeTag = (tag) => {
    setTags((p) => p.filter((t) => t !== tag));
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
      setTags((p) => p.slice(0, -1));
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
              (a.matchedIngredients.length +
                a.extraIngredients.length)) *
            100;

          const bMatch =
            (b.matchedIngredients.length /
              (b.matchedIngredients.length +
                b.extraIngredients.length)) *
            100;

          return bMatch - aMatch;
        }

        return 0;
      });

      setResults(found.length ? found : []);
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="tab-view">
      <div className="tab-view-header">
        <h2>What's in your kitchen?</h2>
        <p>
          Add your ingredients below and we'll find recipes you can make right
          now.
        </p>
      </div>

      <div
        className="ingredient-input-wrap"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="tags-row">
          {tags.map((tag) => (
            <span key={tag} className="ingredient-tag"> // display entered ingredients
              {tag}

              <button
                onClick={(e) => {
                  e.stopPropagation(); //
                  removeTag(tag);
                }}
              >
                ×
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            className="ingredient-input"
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

        <div className="input-hint">
          Press Enter or comma to add each ingredient
        </div>
      </div>

      <button
        className={`search-btn ${
          tags.length || input.trim() ? 'active' : ''
        }`}
        onClick={handleSearch}
        disabled={loading || (!tags.length && !input.trim())}
      >
        {loading ? (
          <span className="btn-loader">
            <span />
            <span />
            <span />
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
    </div>
  );
}