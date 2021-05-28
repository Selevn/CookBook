export const profileActionTypes = {
  SET_PROFILE: 'PROFILE.SET_PROFILE',
  LOGOUT: 'PROFILE.LOGOUT',
  LIKE_COOKBOOK: 'PROFILE.LIKE_COOKBOOK',
  LIKE_RECIPE: 'PROFILE.LIKE_RECIPE',
};

export const profileActions = {
  setProfile: (payload) => ({ type: profileActionTypes.SET_PROFILE, payload }),
  likeCookbook: (payload) => ({ type: profileActionTypes.LIKE_COOKBOOK, payload }),
  likeRecipe: (payload) => ({ type: profileActionTypes.LIKE_RECIPE, payload }),
  logOut: () => ({ type: profileActionTypes.LOGOUT }),
};
