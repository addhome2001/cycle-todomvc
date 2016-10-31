import { Observable } from 'rxjs';
import Cycle from '@cycle/rxjs-run';
import { h, makeDOMDriver} from '@cycle/dom';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

require('./style.scss');

function main({ DOM }) {
  const { DOM: TodoInput$, item: inputText$ } = TodoInput(DOM)
  const { DOM: TodoList$ } = TodoList({ DOM, props: inputText$ });

  const vdom$ = Observable.combineLatest(
    TodoInput$, TodoList$,
    (TodoInput, TodoList) => {
      return h('div.wrapper', [
        h('div.header', TodoInput),
        h('div.content', TodoList),
      ])
    }
  );

  const sink = { DOM: vdom$ };

  return sink;
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app_container')
})
