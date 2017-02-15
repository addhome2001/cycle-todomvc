import { generateRandomNum } from './';

export const getItemsApi = () =>
  ({
    url: `https://jsonplaceholder.typicode.com/todos/${generateRandomNum()}`,
    category: 'getItems',
    method: 'GET',
  });

export const setItemsApi = title =>
  ({
    url: 'https://jsonplaceholder.typicode.com/todos',
    category: 'setItems',
    method: 'POST',
    send: { title },
  });
