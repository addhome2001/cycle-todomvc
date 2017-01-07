import { Observable } from 'rxjs';
import { h } from '@cycle/dom';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import Loader from './Loader';

import { getUserApi, setUserApi } from './utils';

const titleResponse = response =>
  Observable
    .merge(...response)
    .mergeMap(r$ => r$.pluck('text')
    .map(item => JSON.parse(item).title));

const titleRequest = inputText$ =>
  inputText$
    .mergeMap(text => Observable.of(setUserApi(text)))
    .merge(Observable.of(getUserApi()));

export default function ({ DOM, HTTP }) {
  // Response
  const items$ = titleResponse([HTTP.select('getItems'), HTTP.select('setItems')]);

  const { DOM: TodoInput$, item: inputText$ } = TodoInput(DOM);
  const { DOM: TodoList$ } = TodoList({ DOM, props: items$ });

  // Request
  const http$ = Observable.merge(titleRequest(inputText$));

  const { DOM: LockStatus$ } = Loader([http$.mapTo(true), items$.mapTo(false)]);

  const vdom$ = Observable.combineLatest(
    TodoInput$, TodoList$, LockStatus$,
    (TodoInputVdom, TodoListVdom, lockStatus) =>
      h('div.wrapper', [
        h('div.header', TodoInputVdom),
        h('div.content', TodoListVdom),
        lockStatus,
      ]),
  );

  const sink = {
    DOM: vdom$,
    HTTP: http$,
  };

  return sink;
}
