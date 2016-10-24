import { Observable } from 'rxjs';
import Cycle from '@cycle/rxjs-run';
import {div, h ,input, button,ul, makeDOMDriver} from '@cycle/dom';
import isolate from '@cycle/isolate';

const TodoItems = ({ DOM, props: props$ }) => {
  const removeItem$ = DOM.select('.remove').events('click').startWith("");

  const renderList = item => h('li.item', [item, h('button.remove','X')]);

  const state$ =
    props$
      .filter(value => value.trim().length > 0)
      .scan((items, item) => items.concat({ value: item.trim(), complete: false, id: items.length }), [])
      .startWith([]);

  const vdom$ = state$.map(items => items.map(({ value }) => renderList(value)));

  const sink = {
    DOM: vdom$,
    removeItem: removeItem$
  }

  return sink;
}

const TodoInput = (DOM) => {
  const addItem$ = DOM.select('.addBtn').events('click');
  const addItemText$ = DOM.select('.addItemInput').events('input').map(({target:{ value }}) => value);

  const item$ = addItemText$.sample(addItem$).startWith("");

  const vdom$ = addItem$.startWith("").map(() =>
    h('input.addItemInput', {hook: { update:(old, {elm})=> elm.value="" }})
  );

  const sink = {
    DOM: vdom$,
    item: item$
  }

  return sink;
}

function main({ DOM }) {
  const { DOM: TodoInput$, item: inputText$ } = TodoInput(DOM)
  const { DOM: TodoItems$, removeItem: removeItem$ } = TodoItems({ DOM, props: inputText$ });

  const vdom$ = Observable.combineLatest(
    TodoInput$, TodoItems$, removeItem$,
    (TodoInput, TodoItems) => {
      return div([
        'Todo',
        TodoInput,
        button('.addBtn', 'Add'),
        h('p.length', `Length: ${TodoItems.length}`),
        ul('.items', { style: { listStyle: 'none' } }, TodoItems)
      ])
    }
  );

  const sink = { DOM: vdom$ };

  return sink;
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app_container')
})
