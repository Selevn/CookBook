const __ROUTES__ = {
  COOKBOOKS: '/api/cookbooks/',
  RECIPES: '/api/recipes/',
  USERS: '/api/users/',
  COMMENTS: '/api/comments/',
}
exports.ROUTES = {
  COOKBOOKS:__ROUTES__.COOKBOOKS,
  RECIPES:__ROUTES__.RECIPES,
  USERS:__ROUTES__.USERS,
  COMMENTS:__ROUTES__.COMMENTS,

  RECIPE_CLIENT: (id) => `${__ROUTES__.RECIPES}${id}`,
  COOKBOOK_CLIENT: (id) => `${__ROUTES__.COOKBOOKS}${id}`,
  USER_CLIENT: (id) => `${__ROUTES__.USERS}${id}`,

  USER_CLIENT_COOKBOOKS: (id) => `${__ROUTES__.USERS}cookbooks/${id}`,
  USER_CLIENT_RECIPES: (id) => `${__ROUTES__.USERS}recipes/${id}`,

  USER_CLIENT_LIKED_COOKBOOKS: (id) => `${__ROUTES__.USERS}liked/cookbooks/${id}`,
  USER_CLIENT_LIKED_RECIPES: (id) => `${__ROUTES__.USERS}liked/recipes/${id}`,



  USER_RECIPES: `${__ROUTES__.USERS}recipes/`,
  USER_COOKBOOKS: `${__ROUTES__.USERS}cookbooks/`,

  USER_LIKED_RECIPES: `${__ROUTES__.USERS}liked/recipes/`,
  USER_LIKED_COOKBOOKS: `${__ROUTES__.USERS}liked/cookbooks/`,

  USER_LIKE_COOKBOOK: `${__ROUTES__.COOKBOOKS}like/`,
  USER_LIKE_RECIPE: `${__ROUTES__.RECIPES}like/`,

  USER_VISIT_ITEM: `/api/items/visit/`,

  USER_COMMENT: `${__ROUTES__.COMMENTS}comment/`,

  CHANGE_ACC: `/api/changeAccount/`,
  CHANGE_ACC_IMAGE: `/profile`,
  NEW_RECIPE: `/newRecipe`,
  NEW_COOKBOOK: `/newCookBook`,
  EDIT_COOKBOOK: `/editCookBook`,
};

exports.COMMON = {
  ALLCONSTANT: '1000',
  POPULAR: 'mostPopular',
  LIKED: 'mostLiked',
  NEWEST: 'newest',
  OURCHOISE: 'ourChoise',
  ID: 'id',

  COOKBOOK: 'COOKBOOK',
  RECIPE: 'RECIPE',
};

exports.FOLDERS = {
  USERS_AVATARS: "./public/img/profileImages/",
  RECIPES_IMAGES: "./public/img/recipeImages/",
}

exports.USER_FIELDS = {
  name:'name',
  firstName:'name.first',
  lastName:'name.last',
  email:'email',
  image: 'image',
  password: 'password',
  desc:'desc',
  likes:'likes',
  comments:'comments'
}
exports.RECIPE_FIELDS = {
  views:'views',
  image:'image',
  images:'images',
  cookTime:'cookTime',
  creationDate: 'creationDate',
  author: 'author',
  name:'name',
  desc:'desc',
  ingredients:'ingredients',
  directions:'directions',
  commentsIds:'commentsIds',
  likes:'likes'
}
exports.COOKBOOK_FIELDS = {
  views:'views',
  author: 'author',
  name:'name',
  desc:'desc',
  creationDate: 'creationDate',
  filters: 'filters',
  image:'image',
  commentsIds:'commentsIds',
  recipesIds:'recipesIds',
  likes:'likes',
  ID:'_id'
}

