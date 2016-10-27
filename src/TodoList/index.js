import { Collection } from '../helper';
import { TodoItem } from '../TodoItem'

export function TodoList({ DOM, props: props$ }) {
  const add$ = props$.map(val => ({ state$: Observable.of(val.trim()) }));
  const todoListItems$ = Collection(TodoItem, { DOM }, add$, item => item.remove$);
  const vdom$ = Collection.pluck(todoListItems$, item => item.DOM);

  const sink = {
    DOM: vdom$
  }

  return sink;
}
