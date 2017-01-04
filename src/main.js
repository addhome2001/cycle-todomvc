import { Observable } from 'rxjs';
import { h } from '@cycle/dom';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

export default function ({ DOM, HTTP }) {
  const { DOM: TodoInput$, item: inputText$ } = TodoInput(DOM);
  const { DOM: TodoList$ } = TodoList({ DOM, props: inputText$, HTTP });

  const vdom$ = Observable.combineLatest(
    TodoInput$, TodoList$,
    (TodoInputVdom, TodoListVdom) =>
      h('div.wrapper', [
        h('div.header', TodoInputVdom),
        h('div.content', TodoListVdom),
      ]),
  );

  const sink = { DOM: vdom$ };

  return sink;
}
