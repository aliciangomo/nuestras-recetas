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
    id: 1, title: "Tarta de manzana de la abuela", category: 'Postres', time: '1h 30m', servings: 8,
    favourite: true, photo: PHOTOS.applePie, source: 'Familia · Margarita, 1983',
    note: "La abuela la hacía cada domingo de otoño. La cocina se llenaba de canela y mantequilla.",
    ingredients: ["6 manzanas grandes, peladas y en rodajas","2 tazas de harina","125g de mantequilla fría en cubos","1 taza de azúcar","1 cdta de canela","½ cdta de nuez moscada","Pizca de sal","2 cdas de agua fría"],
    steps: ["Precalentar el horno a 180°C. Mezclar harina, sal y mantequilla hasta obtener migas.","Añadir agua fría y amasar. Reposar 30 min en la nevera.","Mezclar las manzanas con el azúcar y las especias.","Forrar un molde de 23cm con la mitad de la masa.","Rellenar con las manzanas y añadir un poco más de mantequilla.","Cubrir con el resto de masa, sellar los bordes y hacer cortes.","Hornear 45–50 min hasta dorar."],
  },
  {
    id: 2, title: "Tarta de limón", category: 'Postres', time: '1h 15m', servings: 8,
    favourite: true, photo: PHOTOS.lemonTart, source: 'Tía Beatriz',
    note: "Brillante, ácida y sedosa. Un clásico de celebración desde siempre.",
    ingredients: ["200g de masa quebrada","4 huevos","200ml de nata para montar","150g de azúcar","Ralladura y zumo de 3 limones"],
    steps: ["Hornear la masa en blanco a 170°C durante 20 min.","Batir huevos, nata, azúcar, ralladura y zumo.","Verter sobre la masa aún caliente.","Hornear a 150°C durante 25–30 min hasta que cuaje.","Dejar enfriar completamente antes de cortar."],
  },
  {
    id: 3, title: "Pollo asado del domingo", category: 'Platos', time: '2h', servings: 6,
    favourite: false, photo: PHOTOS.roastChix, source: 'Familia · Papá',
    note: "Toda la casa se llena del aroma más maravilloso. Un ritual del domingo.",
    ingredients: ["1 pollo entero (1,8kg)","1 limón partido","4 dientes de ajo","Tomillo y romero frescos","3 cdas de aceite de oliva","Sal y pimienta negra"],
    steps: ["Precalentar el horno a 200°C.","Frotar el pollo con aceite, sal y pimienta.","Rellenar la cavidad con limón, ajo y hierbas.","Asar 1h 20m, regando cada 30 minutos.","Reposar 15 min antes de trinchar."],
  },
  {
    id: 4, title: "Pasta al pomodoro", category: 'Platos', time: '30m', servings: 4,
    favourite: false, photo: PHOTOS.pasta, source: 'Nonna Lucía',
    note: "Sencilla, honesta y profundamente satisfactoria. No hace falta más.",
    ingredients: ["400g de espaguetis","800g de tomates maduros o en conserva","4 dientes de ajo en láminas","Albahaca fresca","4 cdas de aceite de oliva","Sal"],
    steps: ["Sofreír el ajo en aceite de oliva 2 min.","Añadir los tomates y sal. Cocer 20 min.","Cocer la pasta en agua bien salada hasta al dente.","Mezclar la pasta con la salsa y la albahaca."],
  },
  {
    id: 5, title: "Pan de plátano con nueces", category: 'Repostería', time: '1h 10m', servings: 8,
    favourite: false, photo: PHOTOS.bananaBread, source: 'Mamá',
    note: "Perfecto para los plátanos muy maduros. Se conserva tres días sin problema.",
    ingredients: ["3 plátanos muy maduros","225g de harina","1 cdta de bicarbonato","½ cdta de sal","115g de mantequilla blanda","150g de azúcar moreno","2 huevos","100g de nueces troceadas"],
    steps: ["Precalentar a 175°C. Engrasar un molde de plum cake.","Chafar los plátanos. Batir mantequilla y azúcar hasta esponjar.","Incorporar los huevos y después los plátanos.","Añadir la harina, bicarbonato, sal y nueces.","Hornear 60–65 min hasta que un palillo salga limpio."],
  },
  {
    id: 6, title: "Ensalada de arroz de verano", category: 'Platos', time: '25m', servings: 4,
    favourite: false, photo: PHOTOS.riceSalad, source: 'importada · bbcgoodfood.com',
    note: "Hierbas frescas, almendras crujientes, hinojo suave — perfecta para las noches de calor.",
    ingredients: ["300g de arroz basmati","1 bulbo de hinojo en rodajas finas","Un puñado de menta y perejil","50g de almendras tostadas","2 cdas de aceite de oliva","Zumo de 1 limón"],
    steps: ["Cocer el arroz y pasar por agua fría.","Aliñar con aceite, limón, hierbas e hinojo.","Añadir las almendras tostadas justo antes de servir."],
  },
];
