/* eslint-disable */
import Config from 'Config';

const { CLIENT_API } = Config;

export default {
  getTodos({ category }) {
    return {
      url: `${CLIENT_API}/todos`,
      category,
      method: 'GET',
    };
  },

  addTodo({ category, payload }) {
    return {
      url: `${CLIENT_API}/todos`,
      category,
      method: 'POST',
      send: payload,
    };
  },

  updateTodo({ category, payload, id }) {
    return {
      url: `${CLIENT_API}/todos/${id}`,
      category,
      method: 'PUT',
      send: payload,
    };
  },

  removeTodo({ category, id }) {
    return {
      url: `${CLIENT_API}/todos/${id}`,
      category,
      method: 'DELETE',
    };
  },

  removeCompletedTodos({ category }) {
    return {
      url: `${CLIENT_API}/todos/checked`,
      category,
      method: 'DELETE',
    };
  },
};
