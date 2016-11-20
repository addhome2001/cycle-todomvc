import indent from './indent';
import model from './model';
import view from './view';

export default function({ DOM, add$ }) {
  const { remove$, ...indents } = indent(DOM);
  const { addItem$, counter$, completeStatus$ } = model({ add$, remove$, ...indents });
  const vdom$ = view(addItem$);

  const sink = {
    DOM: vdom$,
    counter$,
    remove$,
    completeStatus$
  }

  return sink
}
