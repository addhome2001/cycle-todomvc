/* eslint-disable no-undef */

const API = CLIENT_API;

export default {
  getTodos({ category }) {
    return {
      url: API,
      category,
      method: 'GET',
    };
  },

  addTodo({ category, payload }) {
    return {
      url: API,
      category,
      method: 'POST',
      send: payload,
    };
  },

  updateTodo({ category, payload, id }) {
    return {
      url: `${API}/${id}`,
      category,
      method: 'PUT',
      send: payload,
    };
  },

  removeTodo({ category, id }) {
    return {
      url: `${API}/${id}`,
      category,
      method: 'DELETE',
    };
  },

  removeCompeleteTodos({ category }) {
    return {
      url: `${API}/checked`,
      category,
      method: 'DELETE',
    };
  },
};
