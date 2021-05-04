const ROUTES = {
  RECIPE: '/api/recipes/',
  COOKBOOK: '/api/cookbooks/',
  USER: '/api/users/',
};
exports.ROUTES = {
  COOKBOOKS: '/api/cookbooks/',
  RECIPES: '/api/recipes/',

  COOKBOOK_SERVER: `${ROUTES.COOKBOOK}/:id`,
  RECIPE_SERVER: `${ROUTES.RECIPE}/:id`,

  RECIPE_CLIENT: (id) => `${ROUTES.RECIPE}${id}`,
  COOKBOOK_CLIENT: (id) => `${ROUTES.COOKBOOK}${id}`,
  USER_CLIENT: (id) => `${ROUTES.USER}${id}`,
};

exports.COMMON = {
  ALLCONSTANT: '1000',
  POPULAR: 'mostPopular',
  LIKED: 'mostLiked',
  NEWEST: 'newest',
  OURCHOISE: 'ourChoise',
};
