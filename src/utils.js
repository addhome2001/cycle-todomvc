export const generateRandomNum = () => Math.round(Math.random() * 9) + 1;

export const getUserApi = () =>
  ({
    url: `http://jsonplaceholder.typicode.com/todos/${generateRandomNum()}`,
    category: 'getItems',
    method: 'GET',
  });

export const setUserApi = title =>
  ({
    url: 'http://jsonplaceholder.typicode.com/todos',
    category: 'setItems',
    method: 'POST',
    send: { title },
  });
