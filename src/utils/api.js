export default {
  getTodos({ category }) {
    return {
      url: 'https://wt-addhome2001-yahoo-com-tw-0.run.webtask.io/webtask-crud/todos',
      category,
      method: 'GET',
    };
  },

  addTodo({ category, payload }) {
    return {
      url: 'https://wt-addhome2001-yahoo-com-tw-0.run.webtask.io/webtask-crud/todos',
      category,
      method: 'POST',
      send: payload,
    };
  },

  updateTodo({ category, payload, id }) {
    return {
      url: `https://wt-addhome2001-yahoo-com-tw-0.run.webtask.io/webtask-crud/todos/${id}`,
      category,
      method: 'PUT',
      send: payload,
    };
  },

  removeTodo({ category, id }) {
    return {
      url: `https://wt-addhome2001-yahoo-com-tw-0.run.webtask.io/webtask-crud/todos/${id}`,
      category,
      method: 'DELETE',
    };
  },

  removeCompeleteTodos({ category }) {
    return {
      url: 'https://wt-addhome2001-yahoo-com-tw-0.run.webtask.io/webtask-crud/todos/checked',
      category,
      method: 'DELETE',
    };
  },
};
