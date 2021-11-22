exports.HOME_ROUTES = {
  LOGIN: '/api/login',
  EDIT: '/api/edit',
  CREATE: '/api/create',
  CHECK: '/api/check',
  USER_INTERACTIONS: '/api/userInteractions',
  USER_DATA: '/api/userData',
  GET: '/api/get',
};
exports.RELATIVE_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',

  CHANGE_ACC: '/changeAccount',
  CHANGE_ACC_IMAGE: '/profile',
  EDIT_COOKBOOK: '/editCookBook',
  EDIT_RECIPE: '/editRecipe',

  NEW_RECIPE: '/newRecipe',
  NEW_COOKBOOK: '/newCookBook',

  PROFILE_CHECK: '/profile',
  COOKBOOK_CHECK: '/cookbook',
  RECIPE_CHECK: '/recipe',

  USER_LIKE_COOKBOOK: '/likeCookBook',
  USER_LIKE_RECIPE: '/likeRecipe',
  USER_VISIT_ITEM: '/visitItem',
  USER_COMMENT: '/comment',

  USER_RECIPES: '/recipes',
  USER_COOKBOOKS: '/cookbooks',
  USER_LIKED_RECIPES: '/liked/recipes',
  USER_LIKED_COOKBOOKS: '/liked/cookbooks',

  COOKBOOKS: '/cookbooks',
  RECIPES: '/recipes',
  USERS: '/users',
  COMMENTS: '/comments',
};

exports.ROUTES = {
  /* eslint-disable */
  LOGIN_ABSOLUTE_ROUTE: `${exports.HOME_ROUTES.LOGIN}${exports.RELATIVE_ROUTES.LOGIN}`,
  REGISTER_ABSOLUTE_ROUTE: `${exports.HOME_ROUTES.LOGIN}${exports.RELATIVE_ROUTES.REGISTER}`,

  CHANGE_ACC: `${exports.HOME_ROUTES.EDIT}${exports.RELATIVE_ROUTES.CHANGE_ACC}`,
  CHANGE_ACC_IMAGE: `${exports.HOME_ROUTES.EDIT}${exports.RELATIVE_ROUTES.CHANGE_ACC_IMAGE}`,

  EDIT_COOKBOOK: `${exports.HOME_ROUTES.EDIT}${exports.RELATIVE_ROUTES.EDIT_COOKBOOK}`,
  EDIT_RECIPE: `${exports.HOME_ROUTES.EDIT}${exports.RELATIVE_ROUTES.EDIT_RECIPE}`,

  NEW_RECIPE: `${exports.HOME_ROUTES.CREATE}${exports.RELATIVE_ROUTES.NEW_RECIPE}`,
  NEW_COOKBOOK: `${exports.HOME_ROUTES.CREATE}${exports.RELATIVE_ROUTES.NEW_COOKBOOK}`,

  PROFILE_CHECK: `${exports.HOME_ROUTES.CHECK}${exports.RELATIVE_ROUTES.PROFILE_CHECK}`,
  COOKBOOK_CHECK: `${exports.HOME_ROUTES.CHECK}${exports.RELATIVE_ROUTES.COOKBOOK_CHECK}`,
  RECIPE_CHECK: `${exports.HOME_ROUTES.CHECK}${exports.RELATIVE_ROUTES.RECIPE_CHECK}`,

  USER_LIKE_COOKBOOK: `${exports.HOME_ROUTES.USER_INTERACTIONS}${exports.RELATIVE_ROUTES.USER_LIKE_COOKBOOK}`,
  USER_LIKE_RECIPE: `${exports.HOME_ROUTES.USER_INTERACTIONS}${exports.RELATIVE_ROUTES.USER_LIKE_RECIPE}`,
  USER_VISIT_ITEM: `${exports.HOME_ROUTES.USER_INTERACTIONS}${exports.RELATIVE_ROUTES.USER_VISIT_ITEM}`,
  USER_COMMENT: `${exports.HOME_ROUTES.USER_INTERACTIONS}${exports.RELATIVE_ROUTES.USER_COMMENT}`,

  USER_RECIPES: `${exports.HOME_ROUTES.USER_DATA}${exports.RELATIVE_ROUTES.USER_RECIPES}`,
  USER_COOKBOOKS: `${exports.HOME_ROUTES.USER_DATA}${exports.RELATIVE_ROUTES.USER_COOKBOOKS}`,
  USER_LIKED_RECIPES: `${exports.HOME_ROUTES.USER_DATA}${exports.RELATIVE_ROUTES.USER_LIKED_RECIPES}`,
  USER_LIKED_COOKBOOKS: `${exports.HOME_ROUTES.USER_DATA}${exports.RELATIVE_ROUTES.USER_LIKED_COOKBOOKS}`,

  USER_CLIENT_LIKED_COOKBOOKS: (id) =>
      `${exports.HOME_ROUTES.USER_DATA}${exports.RELATIVE_ROUTES.USER_LIKED_COOKBOOKS}/${id}`,
  USER_CLIENT_LIKED_RECIPES: (id) =>
      `${exports.HOME_ROUTES.USER_DATA}${exports.RELATIVE_ROUTES.USER_LIKED_RECIPES}/${id}`,
  USER_CLIENT_COOKBOOKS: (id) =>
      `${exports.HOME_ROUTES.USER_DATA}${exports.RELATIVE_ROUTES.USER_COOKBOOKS}/${id}`,
  USER_CLIENT_RECIPES: (id) =>
      `${exports.HOME_ROUTES.USER_DATA}${exports.RELATIVE_ROUTES.USER_RECIPES}/${id}`,

  COOKBOOKS: `${exports.HOME_ROUTES.GET}${exports.RELATIVE_ROUTES.COOKBOOKS}`,
  RECIPES: `${exports.HOME_ROUTES.GET}${exports.RELATIVE_ROUTES.RECIPES}`,
  USERS: `${exports.HOME_ROUTES.GET}${exports.RELATIVE_ROUTES.USERS}`,
  COMMENTS: `${exports.HOME_ROUTES.GET}${exports.RELATIVE_ROUTES.COMMENTS}`,

  RECIPE_CLIENT: (id) => `${exports.HOME_ROUTES.GET}${exports.RELATIVE_ROUTES.RECIPES}/${id}`,
  COOKBOOK_CLIENT: (id) => `${exports.HOME_ROUTES.GET}${exports.RELATIVE_ROUTES.COOKBOOKS}/${id}`,
  USER_CLIENT: (id) => `${exports.HOME_ROUTES.GET}${exports.RELATIVE_ROUTES.USERS}/${id}`,
  /* eslint-enable */
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
  PROFILE: 'PROFILE',
};

exports.STATE = {
  INIT: 'INIT',
  OK: 'OK',
  FAIL: 'FAIL',
};

exports.FOLDERS = {
  USERS_AVATARS: './public/img/profileImages/',
  RECIPES_IMAGES: './public/img/recipeImages/',
  COOKBOOK_IMAGES: './public/img/cookBookImages/',
};

exports.USER_FIELDS = {
  ID: '_id',
  name: 'name',
  firstName: 'name.first',
  lastName: 'name.last',
  email: 'email',
  image: 'image',
  password: 'password',
  desc: 'desc',
  likes: 'likes',
  comments: 'comments',
  cloudinary_id: 'cloudinary_id',
  isBlocked: 'isBlocked',
  status:'status'
};
exports.RECIPE_FIELDS = {
  views: 'views',
  image: 'image',
  images: 'images',
  cookTime: 'cookTime',
  creationDate: 'creationDate',
  author: 'author',
  name: 'name',
  desc: 'desc',
  ingredients: 'ingredients',
  directions: 'directions',
  commentsIds: 'commentsIds',
  likes: 'likes',
  ID: '_id',
  cloudinary_id: 'cloudinary_id',
  secondary_cloudinary_ids: 'secondary_cloudinary_ids',
};
exports.COOKBOOK_FIELDS = {
  views: 'views',
  author: 'author',
  name: 'name',
  desc: 'desc',
  creationDate: 'creationDate',
  filters: 'filters',
  image: 'image',
  commentsIds: 'commentsIds',
  recipesIds: 'recipesIds',
  likes: 'likes',
  ID: '_id',
  cloudinary_id: 'cloudinary_id',
};

exports.COMMENT_FIELDS = {
  author: 'author',
  text: 'text',
  date: 'date',
  itemType:'itemType',
  itemId:'itemId',
  ID: '_id',
};

exports.TOAST_SETTINGS = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

exports.MESSAGES = {
  ERROR: {
    NO_FILE_CHOSEN: "You didn't choose any file!",
    UNKNOWN: 'Something went wrong! Try again.',
    SERVER_NO_RESPONSE: 'Server is not responding.',
    AUTH: 'You are not authorized.',
    VALIDATION: 'You have errors in some of your fields.',
  },
  SUCCESS: {
    DATA_CHANGED: 'Changes saved!',
    IMAGE_CHANGED: 'Image changed!',
    SAVED: 'Saved!',
    SUCCESS: 'Success!',
  },
};

exports.JWT = {
  maxAge: 15 * 60 * 1000,
};
