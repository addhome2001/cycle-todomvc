import { Observable } from 'rxjs';
import { h } from '@cycle/dom';

export function TodoInput(DOM) {
  const addItemText$ = DOM.select('.addItemInput').events('input').map(({target:{ value }}) => value);
  const addItem$ = Observable.merge(
    DOM.select('.addBtn').events('click').mapTo(null),
    DOM.select('.addItemInput').events('keyup').filter(e => e.code === 'Enter').mapTo(null)
  );

  const action$ = addItemText$.sample(addItem$);

  const vdom$ = action$.startWith("").map(() =>
    h('input.addItemInput', {
      hook: { update:(old, {elm})=> elm.value="" },
      props: { placeholder: "What To Do" }
    })
  );

  const sink = {
    DOM: vdom$,
    item: action$
  }

  return sink;
}
