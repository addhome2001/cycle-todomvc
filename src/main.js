import { Observable } from 'rxjs';
import { h } from '@cycle/dom';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import Loader from './Loader';
import reducer, { getTodos, initialState } from './modules';

import { sendRequest$, getResponse$ } from './helper/services';

export default function ({ DOM, HTTP }) {
  // Response
  const response$ = getResponse$(HTTP.select());

  const state$ = response$.scan(reducer, initialState);
  const todos$ = state$.pluck('todos');
  const leftAmount$ = state$.pluck('leftAmount');

  const {
    DOM: TodoInput$,
    HTTP: addTodo$,
  } = TodoInput({ DOM });

  const {
    DOM: TodoList$,
    HTTP: todoRequest$,
  } = TodoList({ DOM, props: { todos$, leftAmount$ } });

  // Request
  const request$ = sendRequest$(
    Observable.merge(
      // initial request
      Observable.of(getTodos()),
      addTodo$,
      todoRequest$,
    ),
  ).throttleTime(1000);

  const lock$ = Observable.merge(
    request$.mapTo(true),
    response$.mapTo(false),
  );

  const { DOM: Loader$ } = Loader({ props: { lock$ } });

  const vdom$ = Observable.combineLatest(
    TodoInput$, TodoList$, Loader$,
    (TodoInputVdom, TodoListVdom, LoaderVdom) =>
      h('div.wrapper', [
        h('div.header', TodoInputVdom),
        h('div.content', TodoListVdom),
        LoaderVdom,
      ]),
  );

  const sink = {
    DOM: vdom$,
    HTTP: request$,
  };

  return sink;
}
