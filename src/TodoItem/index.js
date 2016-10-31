import indent from './indent';
import model from './model';
import view from './view';

export default function({ DOM, add$ }) {
  const { remove$, complete$ } = indent(DOM);
  const addItem$ = model({ complete$, add$ });
  const vdom$ = view(addItem$);

  const sink = {
    DOM: vdom$,
    remove$
  }

  return sink
}
