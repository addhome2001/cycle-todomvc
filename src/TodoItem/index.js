import indent from './indent';
import model from './model';
import view from './view';

export default function ({ DOM, item$ }) {
  const indents = indent(DOM);
  const {
    itemInfo$,
    checked$,
    todoRequest$,
  } = model({ item$, ...indents });

  const vdom$ = view(itemInfo$);

  const sink = {
    DOM: vdom$,
    HTTP: todoRequest$,
    checked$,
  };

  return sink;
}
