// @ts-ignore
import {ToastOptions, ToastPosition} from "react-toastify";

export const HOME_ROUTES = {
    LOGIN: '/api/login',
    EDIT: '/api/edit',
    CREATE: '/api/create',
    CHECK: '/api/check',
    USER_INTERACTIONS: '/api/userInteractions',
    USER_DATA: '/api/userData',
    GET: '/api/get',
};
export const RELATIVE_ROUTES = {
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

export const ROUTES = {
    /* eslint-disable */
    LOGIN_ABSOLUTE_ROUTE: `${HOME_ROUTES.LOGIN}${RELATIVE_ROUTES.LOGIN}`,
    REGISTER_ABSOLUTE_ROUTE: `${HOME_ROUTES.LOGIN}${RELATIVE_ROUTES.REGISTER}`,

    CHANGE_ACC: `${HOME_ROUTES.EDIT}${RELATIVE_ROUTES.CHANGE_ACC}`,
    CHANGE_ACC_IMAGE: `${HOME_ROUTES.EDIT}${RELATIVE_ROUTES.CHANGE_ACC_IMAGE}`,

    EDIT_COOKBOOK: `${HOME_ROUTES.EDIT}${RELATIVE_ROUTES.EDIT_COOKBOOK}`,
    EDIT_RECIPE: `${HOME_ROUTES.EDIT}${RELATIVE_ROUTES.EDIT_RECIPE}`,

    NEW_RECIPE: `${HOME_ROUTES.EDIT}${RELATIVE_ROUTES.NEW_RECIPE}`,
    NEW_COOKBOOK: `${HOME_ROUTES.EDIT}${RELATIVE_ROUTES.NEW_COOKBOOK}`,

    PROFILE_CHECK: `${HOME_ROUTES.CHECK}${RELATIVE_ROUTES.PROFILE_CHECK}`,
    COOKBOOK_CHECK: `${HOME_ROUTES.CHECK}${RELATIVE_ROUTES.COOKBOOK_CHECK}`,
    RECIPE_CHECK: `${HOME_ROUTES.CHECK}${RELATIVE_ROUTES.RECIPE_CHECK}`,

    USER_LIKE_COOKBOOK: `${HOME_ROUTES.USER_INTERACTIONS}${RELATIVE_ROUTES.USER_LIKE_COOKBOOK}`,
    USER_LIKE_RECIPE: `${HOME_ROUTES.USER_INTERACTIONS}${RELATIVE_ROUTES.USER_LIKE_RECIPE}`,
    USER_VISIT_ITEM: `${HOME_ROUTES.USER_INTERACTIONS}${RELATIVE_ROUTES.USER_VISIT_ITEM}`,
    USER_COMMENT: `${HOME_ROUTES.USER_INTERACTIONS}${RELATIVE_ROUTES.USER_COMMENT}`,

    USER_RECIPES: `${HOME_ROUTES.USER_DATA}${RELATIVE_ROUTES.USER_RECIPES}`,
    USER_COOKBOOKS: `${HOME_ROUTES.USER_DATA}${RELATIVE_ROUTES.USER_COOKBOOKS}`,
    USER_LIKED_RECIPES: `${HOME_ROUTES.USER_DATA}${RELATIVE_ROUTES.USER_LIKED_RECIPES}`,
    USER_LIKED_COOKBOOKS: `${HOME_ROUTES.USER_DATA}${RELATIVE_ROUTES.USER_LIKED_COOKBOOKS}`,

    USER_CLIENT_LIKED_COOKBOOKS: (id: string) =>
        `${HOME_ROUTES.USER_DATA}${RELATIVE_ROUTES.USER_LIKED_COOKBOOKS}/${id}`,
    USER_CLIENT_LIKED_RECIPES: (id: string) =>
        `${HOME_ROUTES.USER_DATA}${RELATIVE_ROUTES.USER_LIKED_RECIPES}/${id}`,
    USER_CLIENT_COOKBOOKS: (id: string) =>
        `${HOME_ROUTES.USER_DATA}${RELATIVE_ROUTES.USER_COOKBOOKS}/${id}`,
    USER_CLIENT_RECIPES: (id: string) =>
        `${HOME_ROUTES.USER_DATA}${RELATIVE_ROUTES.USER_RECIPES}/${id}`,

    COOKBOOKS: `${HOME_ROUTES.GET}${RELATIVE_ROUTES.COOKBOOKS}`,
    RECIPES: `${HOME_ROUTES.GET}${RELATIVE_ROUTES.RECIPES}`,
    USERS: `${HOME_ROUTES.GET}${RELATIVE_ROUTES.USERS}`,
    COMMENTS: `${HOME_ROUTES.GET}${RELATIVE_ROUTES.COMMENTS}`,

    RECIPE_CLIENT: (id: string) => `${HOME_ROUTES.GET}${RELATIVE_ROUTES.RECIPES}/${id}`,
    COOKBOOK_CLIENT: (id: string) => `${HOME_ROUTES.GET}${RELATIVE_ROUTES.COOKBOOKS}/${id}`,
    USER_CLIENT: (id: string) => `${HOME_ROUTES.GET}${RELATIVE_ROUTES.USERS}/${id}`,
    /* eslint-enable */
};

export const COMMON = {
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

export const STATE = {
    INIT: 'INIT',
    OK: 'OK',
    FAIL: 'FAIL',
};

export const FOLDERS = {
    USERS_AVATARS: './public/img/profileImages/',
    RECIPES_IMAGES: './public/img/recipeImages/',
    COOKBOOK_IMAGES: './public/img/cookBookImages/',
};

export const USER_FIELDS = {
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
export const RECIPE_FIELDS = {
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
export const COOKBOOK_FIELDS = {
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

export const COMMENT_FIELDS = {
    author: 'author',
    text: 'text',
    date: 'date',
    itemType:'itemType',
    itemId:'itemId',
    ID: '_id',
};

export const TOAST_SETTINGS: ToastOptions= {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const MESSAGES = {
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

export const JWT = {
    maxAge: 15 * 60 * 1000,
};
