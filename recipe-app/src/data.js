const PHOTOS = {
  applePie:    'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=900&q=85&auto=format&fit=crop',
  lemonTart:   'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=900&q=85&auto=format&fit=crop',
  roastChix:   'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=900&q=85&auto=format&fit=crop',
  pasta:       'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=900&q=85&auto=format&fit=crop',
  bananaBread: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=900&q=85&auto=format&fit=crop',
  riceSalad:   'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=900&q=85&auto=format&fit=crop',
};

export const IMPORT_PHOTO = PHOTOS.riceSalad;

export const INITIAL_RECIPES = [
  {
    id: 1, title: "Grandma's Apple Pie", category: 'Desserts', time: '1h 30m', servings: 8,
    favourite: true, photo: PHOTOS.applePie, source: 'Family · Margaret, 1983',
    note: "Grandma made this every autumn Sunday. The kitchen filled with cinnamon and butter.",
    ingredients: ["6 large apples, peeled & sliced","2 cups plain flour","125g cold butter, cubed","1 cup caster sugar","1 tsp cinnamon","½ tsp nutmeg","Pinch of salt","2 tbsp cold water"],
    steps: ["Preheat oven to 180°C. Rub flour, salt and butter into breadcrumbs.","Add cold water and bring into a dough. Rest 30 min in fridge.","Toss apple slices with sugar and spices.","Line a 23cm pie dish with half the pastry.","Fill with apples, dot with extra butter.","Top with remaining pastry, crimp edges, cut slits.","Bake 45–50 min until deep golden."],
  },
  {
    id: 2, title: "Lemon Tart", category: 'Desserts', time: '1h 15m', servings: 8,
    favourite: true, photo: PHOTOS.lemonTart, source: 'Aunt Beatrice',
    note: "Bright, sharp and silky. A celebration staple for as long as we can remember.",
    ingredients: ["200g shortcrust pastry","4 eggs","200ml double cream","150g caster sugar","Zest & juice of 3 lemons"],
    steps: ["Blind bake pastry case at 170°C for 20 min.","Whisk eggs, cream, sugar, zest and juice.","Pour into warm pastry case.","Bake at 150°C for 25–30 min until just set.","Cool completely before slicing."],
  },
  {
    id: 3, title: "Sunday Roast Chicken", category: 'Mains', time: '2h', servings: 6,
    favourite: false, photo: PHOTOS.roastChix, source: 'Family · Dad',
    note: "The whole house fills with the most wonderful smell. A Sunday ritual.",
    ingredients: ["1 whole chicken (1.8kg)","1 lemon, halved","4 cloves garlic","Fresh thyme & rosemary","3 tbsp olive oil","Sea salt & black pepper"],
    steps: ["Preheat oven to 200°C.","Rub chicken all over with olive oil, salt and pepper.","Stuff cavity with lemon, garlic and herbs.","Roast 1h 20m, basting every 30 minutes.","Rest 15 min before carving."],
  },
  {
    id: 4, title: "Pasta al Pomodoro", category: 'Mains', time: '30m', servings: 4,
    favourite: false, photo: PHOTOS.pasta, source: 'Nonna Lucia',
    note: "Simple, honest and deeply satisfying. Very little is needed.",
    ingredients: ["400g spaghetti","800g ripe tomatoes or tinned","4 cloves garlic, sliced","Fresh basil","4 tbsp olive oil","Sea salt"],
    steps: ["Cook garlic gently in olive oil for 2 min.","Add tomatoes and salt. Simmer 20 min.","Cook pasta in well-salted water until al dente.","Toss pasta with sauce and torn basil."],
  },
  {
    id: 5, title: "Walnut Banana Bread", category: 'Baking', time: '1h 10m', servings: 8,
    favourite: false, photo: PHOTOS.bananaBread, source: 'Mum',
    note: "The perfect use for overripe bananas. Keeps beautifully for three days.",
    ingredients: ["3 very ripe bananas","225g plain flour","1 tsp baking soda","½ tsp salt","115g butter, softened","150g brown sugar","2 eggs","100g walnuts, chopped"],
    steps: ["Preheat oven to 175°C. Grease a loaf tin.","Mash bananas. Cream butter and sugar until fluffy.","Beat in eggs, then stir in bananas.","Fold in flour, baking soda, salt and walnuts.","Bake 60–65 min until a skewer comes out clean."],
  },
  {
    id: 6, title: "Summer Rice Salad", category: 'Mains', time: '25m', servings: 4,
    favourite: false, photo: PHOTOS.riceSalad, source: 'imported · bbcgoodfood.com',
    note: "Bright herbs, crunchy almonds, soft fennel — perfect for hot evenings.",
    ingredients: ["300g basmati rice","1 fennel bulb, finely sliced","Handful mint & parsley","50g toasted almonds","2 tbsp olive oil","Juice of 1 lemon"],
    steps: ["Cook rice and rinse under cold water.","Toss with olive oil, lemon, herbs and fennel.","Top with toasted almonds before serving."],
  },
];
