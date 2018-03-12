import { loadRecipe } from 'utils/loadRecipe';
import { loadRecipes } from 'utils/loadRecipes';

export const LOAD_RECIPES_SUCCESS = (recipes) => ({
  type: 'LOAD_RECIPES_SUCCESS',
  recipes,
});

export const LOAD_RECIPES_ERROR = (error) => ({
  type: 'LOAD_RECIPES_ERROR',
  error,
});

export const LOAD_RECIPE_SUCCESS = (recipe) => ({
  type: 'LOAD_RECIPE_SUCCESS',
  recipe,
});

export const LOAD_RECIPE_ERROR = (error) => ({
  type: 'LOAD_RECIPE_ERROR',
  error,
});

export const LOAD_RECIPE_START = () => ({
  type: 'LOAD_RECIPE_START',
});

export const LOAD_RECIPES_START = () => ({
  type: 'LOAD_RECIPES_START',
});

export const LOAD_RECIPE = (id) => (dispatch) => {
  dispatch(LOAD_RECIPE_START());

  return loadRecipe(id).then(
    (recipe) => {
      return dispatch(LOAD_RECIPE_SUCCESS(recipe));
    },
    (error) => {
      return dispatch(LOAD_RECIPE_ERROR(error));
    },
  );
};

export const LOAD_RECIPES = (offset) => (dispatch) => {
  dispatch(LOAD_RECIPES_START());

  return loadRecipes(offset).then(
    (recipes) => {
      return dispatch(LOAD_RECIPES_SUCCESS(recipes));
    },
    (error) => {
      return dispatch(LOAD_RECIPES_ERROR(error));
    },
  );
};
