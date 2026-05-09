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
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),

  Protein: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    </svg>
  ),

  Dairy: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 2h8l2 7H6L8 2z" />
      <path d="M6 9v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" />
    </svg>
  ),

  Pantry: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
    </svg>
  ),

  Spices: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    </svg>
  ),

  Other: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }

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

  const progress = total
    ? Math.round((done / total) * 100)
    : 0;

  return (
    <div className="tab-view">
      <div className="tab-view-header">
        <h2>What do you want to cook?</h2>

        <p>
          Enter a dish name and get a complete grocery list to shop for.
        </p>
      </div>

      <div className="dish-input-wrap">
        <div className="dish-input-inner">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="dish-input-icon"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>

          <input
            className="dish-input"
            placeholder="e.g. Spaghetti Carbonara, Beef Tacos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && handleSearch()
            }
          />
        </div>
      </div>

      <button
        className={`search-btn ${
          input.trim() ? 'active' : ''
        }`}
        onClick={handleSearch}
        disabled={loading || !input.trim()}
      >
        {loading ? (
          <span className="btn-loader">
            <span />
            <span />
            <span />
            Building grocery list...
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
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect
                x="9"
                y="3"
                width="6"
                height="4"
                rx="1"
              />
              <path d="M9 12h6M9 16h4" />
            </svg>

            Build Grocery List
          </>
        )}
      </button>

      {result && (
        <div className="results-section">
          <div className="grocery-hero">
            <img src={result.image} alt={result.dish} />

            <div className="grocery-hero-overlay" />

            <div className="grocery-hero-info">
              <h3>{result.dish}</h3>

              <p>{result.description}</p>

              <div className="grocery-hero-meta">
                <span>{result.time}</span>

                <span>
                  Serves {result.servings}
                </span>
              </div>
            </div>
          </div>

          <div className="grocery-progress-wrap">
            <div className="grocery-progress-label">
              <span>Shopping Progress</span>

              <span className="progress-count">
                {done} / {total} items
              </span>
            </div>

            <div className="grocery-progress-bar">
              <div
                className="grocery-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <div className="grocery-list">
            {CATEGORY_ORDER.filter(
              (cat) => grouped[cat]
            ).map((category, ci) => (
              <div
                key={category}
                className="grocery-category"
                style={{
                  animationDelay: `${ci * 80}ms`,
                }}
              >
                <div className="grocery-category-header">
                  <span className="category-icon">
                    {CATEGORY_ICONS[category]}
                  </span>

                  <span className="category-name">
                    {category}
                  </span>

                  <span className="category-count">
                    {grouped[category].length}
                  </span>
                </div>

                <div className="grocery-items">
                  {grouped[category].map((item, ii) => (
                    <button
                      key={item.name}
                      className={`grocery-item ${
                        checked.has(item.name)
                          ? 'checked'
                          : ''
                      }`}
                      onClick={() =>
                        toggleCheck(item.name)
                      }
                      style={{
                        animationDelay: `${
                          ci * 80 + ii * 40
                        }ms`,
                      }}
                    >
                      <div className="grocery-checkbox">
                        {checked.has(item.name) && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>

                      <span className="grocery-item-name">
                        {item.name}
                      </span>

                      <span className="grocery-item-amount">
                        {item.amount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {done === total && total > 0 && (
            <div className="grocery-complete">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
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