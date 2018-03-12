const initialState = {
  recipes: [],
  currentRecipe: null,
  loader: true,
  error: null,
};

export const recipes = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD_RECIPE_START':
    case 'LOAD_RECIPES_START':
      return { ...state, loader: true, error: null };

    case 'LOAD_RECIPE_SUCCESS':
      return {
        ...state,
        currentRecipe: action.recipe,
        loader: false,
        error: null,
      };
    case 'LOAD_RECIPES_SUCCESS':
      return {
        ...state,
        recipes: [...state.recipes, ...action.recipes],
        loader: false,
        error: null,
      };
    case 'LOAD_RECIPE_ERROR':
    case 'LOAD_RECIPES_ERROR':
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    default:
      return state;
  }
};
