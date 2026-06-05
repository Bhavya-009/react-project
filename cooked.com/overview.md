# Project Documentation: cooked.com

## Overview
**cooked.com** is a React-based web application designed to help users decide what to eat. It offers two main workflows: finding recipes based on available ingredients (**Make**) or generating a grocery list for a specific dish (**Plan**).

## Core Technologies
- **React**: Frontend framework for building the UI.
- **Tailwind CSS**: For styling with utility classes and a dark-themed aesthetic.
- **Spoonacular API**: Provides the recipe data, ingredient matching, and nutritional information.

---

## File Breakdown & Logic

### 1. `App.jsx` (The Orchestrator)
- **What**: The root component that manages high-level navigation.
- **When**: Used to switch between the initial "Landing" screen and the main "AppView."
- **Why**: It uses **State Lifting**. By keeping `showApp` and `activeTab` here, the app remembers which tool the user clicked on the landing page and displays it immediately in the main view.

### 2. `Landing.jsx` (The Entry Point)
- **What**: A visually engaging welcome screen.
- **When**: Displayed when the user first visits the site.
- **Why**: Focuses on **User Intent**. It provides two clear paths ("Make" or "Plan") to simplify the user experience before overwhelming them with search bars.

### 3. `AppView.jsx` (The Layout Wrapper)
- **What**: Contains the shared navigation bar and footer.
- **When**: Active once the user enters the app.
- **Why**: Implements **Conditional Rendering**. Based on the `activeTab` prop, it swaps between the `MakeDish` and `PlanDish` components without reloading the page.

### 4. `MakeDish.jsx` (The "Pantry" Tool)
- **What**: A search engine where users input ingredients they already have.
- **When**: Used when a user wants to reduce food waste and cook with current stock.
- **Concepts**:
    - **Tagging System**: Users can add multiple ingredients as tags.
    - **Complex Search**: Calls the API with `includeIngredients` to find recipes that maximize the use of the user's list.
    - **Filtering**: Allows sorting by calories, time, or "Best Match" (most ingredients owned).

### 5. `PlanDish.jsx` (The "Grocery" Tool)
- **What**: A search tool that generates a checklist for a specific recipe.
- **When**: Used when a user has a specific craving and needs to shop for it.
- **Concepts**:
    - **Data Mapping**: Converts raw API aisle data into user-friendly categories (Produce, Protein, etc.).
    - **Progress Tracking**: Uses a `Set` in React state to track checked items and calculate a completion percentage.

---

## Key Development Concepts Used

| Concept | Usage in Project |
| :--- | :--- |
| **Hooks (`useState`, `useRef`)** | Managing input text, API results, and focus states. |
| **Asynchronous API Calls** | Using `fetch` with `async/await` to get real-time data from Spoonacular. |
| **Props & Callbacks** | Passing functions from `App` down to `Landing` to update state. |
| **Utility-First CSS** | Using Tailwind for responsive design (e.g., `flex-col md:flex-row`). |
| **Environment Variables** | Keeping the `API_KEY` secure using `import.meta.env`. |


## Future Improvements - 
- Responsive design
- Favorite recipes
- Nutrition dashboard
- Advanced ingredient filters
- Cuisine-based search
- User Authentication





