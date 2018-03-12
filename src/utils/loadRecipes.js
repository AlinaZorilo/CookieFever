import { SERVER_PATH } from 'const';

export const loadRecipes = (offset) => {
  return fetch(`${SERVER_PATH}/recipes`, {
    method: 'POST',
    body: JSON.stringify({
      offset,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw new Error(res.error);
      }

      return res.data;
    });
};
