const __ROUTES__ = {
  COOKBOOKS: '/api/cookbooks/',
  RECIPES: '/api/recipes/',
  USERS: '/api/users/',
}
exports.ROUTES = {
  COOKBOOKS:__ROUTES__.COOKBOOKS,
  RECIPES:__ROUTES__.RECIPES,
  USERS:__ROUTES__.USERS,

  RECIPE_CLIENT: (id) => `${__ROUTES__.RECIPES}${id}`,
  COOKBOOK_CLIENT: (id) => `${__ROUTES__.COOKBOOKS}${id}`,
  USER_CLIENT: (id) => `${__ROUTES__.USERS}${id}`,

  USER_CLIENT_COOKBOOKS: (id) => `${__ROUTES__.USERS}cookbooks/${id}`,
  USER_CLIENT_RECIPES: (id) => `${__ROUTES__.USERS}recipes/${id}`,

  USER_RECIPES: `${__ROUTES__.USERS}recipes/`,
  USER_COOKBOOKS: `${__ROUTES__.USERS}cookbooks/`,
};

exports.COMMON = {
  ALLCONSTANT: '1000',
  POPULAR: 'mostPopular',
  LIKED: 'mostLiked',
  NEWEST: 'newest',
  OURCHOISE: 'ourChoise',
};
