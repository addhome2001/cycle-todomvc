import indent from './indent';
import model from './model';
import view from './view';

export default function({ DOM, add$ }) {
  const { remove$, complete$ } = indent(DOM);
  const { addItem$, counter$, completeStatus$ } = model({ complete$, add$, remove$ });
  const vdom$ = view(addItem$);

  const sink = {
    DOM: vdom$,
    counter$,
    remove$,
    completeStatus$
  }

  return sink
}
