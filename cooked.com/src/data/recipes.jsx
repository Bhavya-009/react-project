export const RECIPES = [
  {
    id: '1',
    name: 'Garlic Butter Pasta',
    description: 'A silky, rich pasta tossed in golden garlic butter with fresh herbs and a touch of parmesan.',
    matchedIngredients: ['pasta', 'garlic', 'butter'],
    extraIngredients: ['parmesan', 'parsley', 'black pepper'],
    steps: [
      'Boil pasta in salted water until al dente.',
      'Melt butter in a large skillet over medium heat.',
      'Add minced garlic and cook for 2 minutes until golden.',
      'Toss cooked pasta in the garlic butter.',
      'Finish with parmesan and fresh parsley.',
    ],
    time: '20 min',
    timeMinutes: 20,
    caloriesNum: 420,
    difficulty: 'Easy',
    image: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: '420 kcal',
    dietType: 'veg',
  },
  {
    id: '2',
    name: 'Tomato Basil Bruschetta',
    description: 'Crispy toasted bread topped with fresh tomatoes, fragrant basil and a drizzle of olive oil.',
    matchedIngredients: ['tomato', 'bread', 'garlic', 'basil'],
    extraIngredients: ['olive oil', 'salt', 'balsamic glaze'],
    steps: [
      'Toast slices of rustic bread until golden.',
      'Dice tomatoes and combine with fresh basil.',
      'Season with salt, olive oil, and garlic.',
      'Spoon mixture over toasted bread.',
      'Drizzle with balsamic glaze before serving.',
    ],
    time: '15 min',
    timeMinutes: 15,
    caloriesNum: 280,
    difficulty: 'Easy',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: '280 kcal',
    dietType: 'veg',
  },
  {
    id: '3',
    name: 'Creamy Mushroom Risotto',
    description: 'Velvety arborio rice slowly cooked with earthy mushrooms, white wine and parmesan.',
    matchedIngredients: ['mushroom', 'onion', 'garlic', 'rice'],
    extraIngredients: ['white wine', 'parmesan', 'vegetable broth', 'butter'],
    steps: [
      'Sauté onions and garlic in olive oil.',
      'Add sliced mushrooms and cook until golden.',
      'Toast arborio rice for 2 minutes.',
      'Add white wine and let absorb.',
      'Add broth ladle by ladle, stirring until creamy.',
      'Finish with butter and parmesan.',
    ],
    time: '40 min',
    timeMinutes: 40,
    caloriesNum: 520,
    difficulty: 'Medium',
    image: 'https://images.pexels.com/photos/3872373/pexels-photo-3872373.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: '520 kcal',
    dietType: 'veg',
  },
  {
    id: '4',
    name: 'Lemon Herb Chicken',
    description: 'Juicy pan-seared chicken breast infused with lemon zest and a medley of fresh herbs.',
    matchedIngredients: ['chicken', 'lemon', 'garlic'],
    extraIngredients: ['rosemary', 'thyme', 'olive oil', 'butter'],
    steps: [
      'Season chicken with salt, pepper and herbs.',
      'Heat olive oil in a cast iron pan.',
      'Sear chicken 6 minutes per side until golden.',
      'Add butter, garlic and lemon slices to baste.',
      'Rest for 5 minutes before slicing.',
    ],
    time: '30 min',
    timeMinutes: 30,
    caloriesNum: 380,
    difficulty: 'Medium',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: '380 kcal',
    dietType: 'non-veg',
  },
  {
    id: '5',
    name: 'Avocado Egg Toast',
    description: 'Smashed avocado on sourdough topped with a perfectly soft-boiled egg and chili flakes.',
    matchedIngredients: ['avocado', 'egg', 'bread'],
    extraIngredients: ['lemon', 'chili flakes', 'salt', 'everything bagel seasoning'],
    steps: [
      'Toast sourdough bread to your liking.',
      'Smash avocado with lemon juice and salt.',
      'Soft boil eggs for 7 minutes, then peel.',
      'Spread avocado on toast.',
      'Top with egg, chili flakes and seasoning.',
    ],
    time: '12 min',
    timeMinutes: 12,
    caloriesNum: 340,
    difficulty: 'Easy',
    image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: '340 kcal',
    dietType: 'veg',
  },
  {
    id: '6',
    name: 'Spicy Tuna Stir Fry',
    description: 'Tender tuna strips wok-tossed with vibrant vegetables in a bold sriracha-soy glaze.',
    matchedIngredients: ['tuna', 'soy sauce', 'onion'],
    extraIngredients: ['sriracha', 'ginger', 'sesame oil', 'bell pepper'],
    steps: [
      'Cut tuna into strips and marinate in soy sauce.',
      'Heat wok on high heat with sesame oil.',
      'Stir-fry onions and bell peppers for 2 minutes.',
      'Add tuna and cook for 3 minutes.',
      'Toss with sriracha and ginger, serve immediately.',
    ],
    time: '25 min',
    timeMinutes: 25,
    caloriesNum: 460,
    difficulty: 'Medium',
    image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: '460 kcal',
    dietType: 'non-veg',
  },
];

export function findRecipes(ingredientInput) {
  const userIngredients = ingredientInput
    .toLowerCase()
    .split(/[,\s]+/)
    .map(i => i.trim())
    .filter(Boolean);

  if (userIngredients.length === 0) return [];

  const scored = RECIPES.map(recipe => {
    const matched = recipe.matchedIngredients.filter(ing =>
      userIngredients.some(ui => ing.includes(ui) || ui.includes(ing))
    );
    const matchPercent = (matched.length / recipe.matchedIngredients.length) * 100;
    return { recipe, score: matched.length, matchPercent };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => ({ ...s.recipe, matchPercent: s.matchPercent }));
}
