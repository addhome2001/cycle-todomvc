import indent from './indent';
import model from './model';
import view from './view';

export default function ({ DOM, add$ }) {
  const indents = indent(DOM);
  const { addItem$, counter$, completeStatus$ } = model({ add$, ...indents });
  const vdom$ = view(addItem$);

  const sink = {
    DOM: vdom$,
    counter$,
    remove$: indents.remove$,
    completeStatus$,
  };

  return sink;
}
