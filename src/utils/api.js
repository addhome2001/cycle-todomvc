import { generateRandomNum } from './utils';

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
