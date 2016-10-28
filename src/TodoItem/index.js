import { h } from '@cycle/dom';
import { Observable } from 'rxjs';

export function TodoItem({ DOM, state$ }) {
  const removeItem$ = DOM.select('.remove').events('click');
  const complete$ = DOM.select('.complete').events('change').map(e => e.target.checked).startWith(false);

  const TodoItem = ([text, complete]) => (
    h('li.item', [
      h('label.check', [
        h('span.box', { class: { checkedBox: complete } }),
        h('input.complete', { props: { type: 'checkbox', checked: complete } }),
      ]),
      h('div.text', { class: { checked: complete } }, text),
      h('div.remove')])
  );

  const sink = {
    DOM: Observable.combineLatest(
      state$,
      complete$
    ).map(TodoItem),
    remove$: removeItem$
  }

  return sink
}
