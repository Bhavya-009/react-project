export const DISHES = [
  {
    id: '1',
    dish: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with eggs, guanciale, pecorino and black pepper.',
    servings: 2,
    time: '25 min',
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800',
    items: [
      { name: 'Spaghetti', amount: '200g', category: 'Pantry' },
      { name: 'Guanciale or Pancetta', amount: '150g', category: 'Protein' },
      { name: 'Eggs', amount: '3 large', category: 'Dairy' },
      { name: 'Pecorino Romano', amount: '60g', category: 'Dairy' },
      { name: 'Black Pepper', amount: '1 tsp freshly ground', category: 'Spices' },
      { name: 'Salt', amount: 'to taste', category: 'Spices' },
    ],
  },
  {
    id: '2',
    dish: 'Beef Tacos',
    description: 'Smoky seasoned ground beef in corn tortillas with fresh toppings.',
    servings: 4,
    time: '30 min',
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=800',
    items: [
      { name: 'Ground Beef', amount: '500g', category: 'Protein' },
      { name: 'Corn Tortillas', amount: '8 pieces', category: 'Pantry' },
      { name: 'Cheddar Cheese', amount: '100g shredded', category: 'Dairy' },
      { name: 'Avocado', amount: '2 ripe', category: 'Produce' },
      { name: 'Tomato', amount: '2 medium', category: 'Produce' },
      { name: 'Red Onion', amount: '1 small', category: 'Produce' },
      { name: 'Lime', amount: '2', category: 'Produce' },
      { name: 'Taco Seasoning', amount: '2 tbsp', category: 'Spices' },
      { name: 'Sour Cream', amount: '100ml', category: 'Dairy' },
    ],
  },
  {
    id: '3',
    dish: 'Chicken Tikka Masala',
    description: 'Tender chicken in a rich, smoky tomato-cream curry sauce.',
    servings: 4,
    time: '50 min',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    items: [
      { name: 'Chicken Breast', amount: '700g', category: 'Protein' },
      { name: 'Plain Yogurt', amount: '200ml', category: 'Dairy' },
      { name: 'Crushed Tomatoes', amount: '400g can', category: 'Pantry' },
      { name: 'Heavy Cream', amount: '150ml', category: 'Dairy' },
      { name: 'Onion', amount: '2 large', category: 'Produce' },
      { name: 'Garlic', amount: '6 cloves', category: 'Produce' },
      { name: 'Fresh Ginger', amount: '2 inch piece', category: 'Produce' },
      { name: 'Garam Masala', amount: '2 tsp', category: 'Spices' },
      { name: 'Cumin', amount: '1 tsp', category: 'Spices' },
      { name: 'Paprika', amount: '1 tsp', category: 'Spices' },
      { name: 'Basmati Rice', amount: '300g', category: 'Pantry' },
    ],
  },
  {
    id: '4',
    dish: 'Caesar Salad',
    description: 'Crisp romaine lettuce with creamy Caesar dressing, croutons and parmesan.',
    servings: 2,
    time: '15 min',
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800',
    items: [
      { name: 'Romaine Lettuce', amount: '1 large head', category: 'Produce' },
      { name: 'Parmesan Cheese', amount: '50g', category: 'Dairy' },
      { name: 'Sourdough Bread', amount: '2 slices', category: 'Pantry' },
      { name: 'Anchovy Fillets', amount: '4 pieces', category: 'Protein' },
      { name: 'Garlic', amount: '2 cloves', category: 'Produce' },
      { name: 'Lemon', amount: '1', category: 'Produce' },
      { name: 'Dijon Mustard', amount: '1 tsp', category: 'Pantry' },
      { name: 'Olive Oil', amount: '60ml', category: 'Pantry' },
      { name: 'Worcestershire Sauce', amount: '1 tsp', category: 'Pantry' },
    ],
  },
  {
    id: '5',
    dish: 'Mushroom Risotto',
    description: 'Luxuriously creamy arborio rice with mixed wild mushrooms.',
    servings: 2,
    time: '40 min',
    image: 'https://images.pexels.com/photos/3872373/pexels-photo-3872373.jpeg?auto=compress&cs=tinysrgb&w=800',
    items: [
      { name: 'Arborio Rice', amount: '200g', category: 'Pantry' },
      { name: 'Mixed Mushrooms', amount: '300g', category: 'Produce' },
      { name: 'Onion', amount: '1 medium', category: 'Produce' },
      { name: 'Garlic', amount: '3 cloves', category: 'Produce' },
      { name: 'Vegetable Broth', amount: '1 liter', category: 'Pantry' },
      { name: 'White Wine', amount: '150ml', category: 'Other' },
      { name: 'Parmesan', amount: '60g', category: 'Dairy' },
      { name: 'Butter', amount: '40g', category: 'Dairy' },
      { name: 'Fresh Thyme', amount: '4 sprigs', category: 'Produce' },
    ],
  },
  {
    id: '6',
    dish: 'Pancakes',
    description: 'Fluffy American-style buttermilk pancakes with maple syrup.',
    servings: 4,
    time: '20 min',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
    items: [
      { name: 'All-Purpose Flour', amount: '200g', category: 'Pantry' },
      { name: 'Buttermilk', amount: '300ml', category: 'Dairy' },
      { name: 'Eggs', amount: '2 large', category: 'Dairy' },
      { name: 'Butter', amount: '50g melted', category: 'Dairy' },
      { name: 'Baking Powder', amount: '2 tsp', category: 'Pantry' },
      { name: 'Sugar', amount: '2 tbsp', category: 'Pantry' },
      { name: 'Salt', amount: '1/2 tsp', category: 'Spices' },
      { name: 'Maple Syrup', amount: 'to serve', category: 'Pantry' },
      { name: 'Fresh Berries', amount: 'to garnish', category: 'Produce' },
    ],
  },
];

export function findDish(query) {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  const exact = DISHES.find(d => d.dish.toLowerCase() === q);
  if (exact) return exact;

  const partial = DISHES.find(d =>
    d.dish.toLowerCase().includes(q) ||
    q.includes(d.dish.toLowerCase().split(' ')[0].toLowerCase())
  );

  return partial || DISHES[Math.floor(Math.random() * DISHES.length)];
}