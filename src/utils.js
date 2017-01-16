export const generateRandomNum = () => Math.round(Math.random() * 9) + 1;

export const getUserApi = () =>
  ({
    url: `https://jsonplaceholder.typicode.com/todos/${generateRandomNum()}`,
    category: 'getItems',
    method: 'GET',
  });

export const setUserApi = title =>
  ({
    url: 'https://jsonplaceholder.typicode.com/todos',
    category: 'setItems',
    method: 'POST',
    send: { title },
  });
