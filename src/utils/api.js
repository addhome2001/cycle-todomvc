/* eslint-disable */
import Config from 'Config';

const { CLIENT_API } = Config;

export default {
  getTodos({ category }) {
    return {
      url: CLIENT_API,
      category,
      method: 'GET',
    };
  },

  addTodo({ category, payload }) {
    return {
      url: CLIENT_API,
      category,
      method: 'POST',
      send: payload,
    };
  },

  updateTodo({ category, payload, id }) {
    return {
      url: `${CLIENT_API}/${id}`,
      category,
      method: 'PUT',
      send: payload,
    };
  },

  removeTodo({ category, id }) {
    return {
      url: `${CLIENT_API}/${id}`,
      category,
      method: 'DELETE',
    };
  },

  removeCompeleteTodos({ category }) {
    return {
      url: `${CLIENT_API}/checked`,
      category,
      method: 'DELETE',
    };
  },
};
