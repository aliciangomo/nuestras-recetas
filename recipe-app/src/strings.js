export const S = {
  // App
  appName: 'Nuestras Recetas',
  tagline: 'nuestra cocina',

  // Home
  recipeCount: (n) => `${n} receta${n !== 1 ? 's' : ''}`,
  savedCount: (n) => `${n} guardada${n !== 1 ? 's' : ''}`,
  recentlyAdded: 'añadidas recientemente',
  allRecipes: 'todas las recetas',

  // Categories
  catAll: 'Todas',
  categories: ['Platos', 'Postres', 'Repostería', 'Entrantes', 'Desayuno'],

  // Nav
  navRecipes: 'Recetas',
  navSearch: 'Buscar',
  navAdd: 'Añadir',
  navSaved: 'Guardadas',

  // Detail
  ingredients: 'Ingredientes',
  method: 'Preparación',
  servings: 'porciones',
  tapToCheck: 'toca para marcar mientras cocinas',
  favouriteThis: '♡ Guardar en favoritos',
  from: 'De: ',

  // Add recipe
  newRecipe: 'Nueva Receta',
  cancel: 'Cancelar',
  save: 'Guardar',
  writeItOut: '✎  Escribir',
  importLink: '⤓  Importar enlace',
  addPhoto: 'Añadir foto',
  addPhotoSub: 'Toca para subir de tu biblioteca',
  changePhoto: 'Cambiar',
  recipeName: 'Nombre de la receta',
  required: 'obligatorio',
  category: 'Categoría',
  cookTime: 'Tiempo',
  cookTimePlaceholder: 'p.ej. 45m',
  servingsLabel: 'Porciones',
  fromLabel: 'De',
  fromPlaceholder: 'p.ej. Mamá, Tía Bea',
  note: 'Una nota',
  notePlaceholder: 'Un recuerdo, quién te lo enseñó, cuándo hacerlo…',
  ingredientsLabel: 'Ingredientes',
  onePerLine: 'uno por línea',
  ingredientsPlaceholder: '2 tazas de harina\n3 huevos\n…',
  methodLabel: 'Preparación',
  oneStepPerLine: 'un paso por línea',
  methodPlaceholder: 'Precalentar el horno a 180°C…\nMezclar los ingredientes secos…\n…',
  saveRecipe: 'Guardar Receta',
  pasteLink: 'Pega un enlace de receta',
  pasteLinkSub: 'Obtendremos los ingredientes, la preparación y una foto para que puedas revisarlos.',
  websiteUrl: 'URL del sitio web',
  importRecipe: 'Importar receta',
  fetchingRecipe: 'Obteniendo receta…',

  // Search
  searchTitle: 'Buscar',
  searchTagline: 'encuentra esa receta',
  searchPlaceholder: 'Recetas, ingredientes, categorías…',
  clear: 'Borrar',
  recentSearches: 'búsquedas recientes',
  browseBy: 'explorar por',
  browseItems: ['Rápidas (menos de 30m)', 'Vegetariano', 'Clásicos familiares', 'Importadas'],
  results: (n, q) => `${n} ${n === 1 ? 'resultado' : 'resultados'} para "${q}"`,
  noResults: 'Sin resultados. Prueba otra palabra.',

  // Saved
  savedTagline: 'hecho con amor',
  savedTitle: 'Recetas Guardadas',
  favCount: (n) => `${n} favorita${n !== 1 ? 's' : ''}`,
  noSaved: 'Aún no hay recetas guardadas.\nToca ♡ en cualquier receta para añadirla aquí.',

  // Share
  shareLabel: 'compartir receta',
  copyLink: 'Copiar enlace',
  copyLinkSub: (id) => `nuestrasrecetas.app/r/${id}`,
  sendMessages: 'Enviar por Mensajes',
  sendMessagesSub: 'Elige un contacto',
  savePdf: 'Guardar como PDF',
  savePdfSub: 'Para imprimir o guardar sin conexión',
  sendEmail: 'Enviar por correo',
  sendEmailSub: 'Compartir con la familia',
  copied: '¡Copiado!',

  // Delete
  deleteTitle: '¿Eliminar esta receta?',
  deleteBody: (title) => `"${title}" se eliminará de tu colección. Esta acción no se puede deshacer.`,
  keepIt: 'Conservar',
  deleteConfirm: 'Eliminar',

  // Toasts
  toastSaved: 'Añadida a Guardadas ♡',
  toastPhoto: 'Foto actualizada',
  toastDeleted: 'Receta eliminada',
  toastAdded: 'Receta añadida',

  // Welcome
  welcomeTagline: 'hechas con amor, compartidas en familia',
  welcomeBtn: 'Entrar a la cocina',
};
