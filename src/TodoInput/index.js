import { h } from '@cycle/dom';

export function TodoInput(DOM) {
  const addItem$ = DOM.select('.addBtn').events('click').mapTo(null);
  const addItemText$ = DOM.select('.addItemInput').events('input').map(({target:{ value }}) => value);

  const item$ = addItemText$.sample(addItem$);

  const vdom$ = addItem$.startWith("").map(() =>
    h('input.addItemInput', {
      hook: { update:(old, {elm})=> elm.value="" },
      props: { placeholder: "What To Do" }
    })
  );

  const sink = {
    DOM: vdom$,
    item: item$
  }

  return sink;
}
