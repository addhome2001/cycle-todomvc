/* eslint-disable no-underscore-dangle */
import { incOrdec, todoFactory } from '../utils';

// constants
const GET_TODOS = 'GET_TODOS';
const ADD_TODO = 'ADD_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const REMOVE_COMPELETED_TODOS = 'REMOVE_COMPELETED_TODOS';

// reducers
export const initialState = {
  ids: [],
  todos: [],
  leftAmount: 0,
};

export const reducers = {
  [GET_TODOS](state, newTodos) {
    return {
      todos: newTodos.map(todoFactory),
      ids: newTodos.map(todo => todo._id),
      leftAmount: newTodos.filter(todo => !todo.checked).length,
    };
  },
  [ADD_TODO](state, newTodo) {
    const { ids, todos, leftAmount } = state;

    return {
      todos: todos.concat(todoFactory(newTodo)),
      ids: ids.concat(newTodo._id),
      leftAmount: leftAmount + 1,
    };
  },
  [UPDATE_TODO](state, newTodo) {
    const { ids, todos, leftAmount } = state;
    const { _id, checked } = newTodo;
    const index = ids.indexOf(_id);
    const { checked: prevChecked } = todos[index].item$;
    const modifiedChecked = prevChecked !== checked;

    return Object.assign({}, state, {
      todos: [
        ...todos.slice(0, index),
        todoFactory(newTodo),
        ...todos.slice(index + 1),
      ],
      leftAmount: modifiedChecked ? incOrdec(checked, leftAmount) : leftAmount,
    });
  },
  [REMOVE_TODO](state, removedTodo) {
    const { ids, todos, leftAmount } = state;
    const { _id, checked } = removedTodo;
    const index = ids.indexOf(_id);

    return {
      todos: todos.slice(0, index).concat(todos.slice(index + 1)),
      ids: ids.slice(0, index).concat(ids.slice(index + 1)),
      leftAmount: checked ? leftAmount : leftAmount - 1,
    };
  },
  [REMOVE_COMPELETED_TODOS](state) {
    const { todos } = state;
    const remainerTodos = todos.filter(todo => !todo.item$.checked);

    return Object.assign({}, state, {
      todos: remainerTodos,
      ids: remainerTodos.map(todo => todo._id),
    });
  },
};

export default function reducer(state, { type, payload }) {
  if (type in reducers) {
    return reducers[type](state, payload);
  }
  return state;
}

// action creaters
export function getTodos() {
  return client => client.getTodos({
    category: GET_TODOS,
  });
}

export function addTodo(content) {
  return client => client.addTodo({
    category: ADD_TODO,
    payload: { content },
  });
}

export function updateTodo(id, payload) {
  return client => client.updateTodo({
    category: UPDATE_TODO,
    payload,
    id,
  });
}

export function removeTodo(id) {
  return client => client.removeTodo({
    category: REMOVE_TODO,
    id,
  });
}

export function removeCompeleteTodos() {
  return client => client.removeCompeleteTodos({
    category: REMOVE_COMPELETED_TODOS,
  });
}
