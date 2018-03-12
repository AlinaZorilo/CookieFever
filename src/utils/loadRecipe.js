import { SERVER_PATH } from 'const';

export const loadRecipe = (id) => {
  return fetch(`${SERVER_PATH}/recipe/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (res.error) {
        throw new Error(res.error);
      }

      return res.data;
    });
};
