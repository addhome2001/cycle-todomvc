import indent from './indent';
import model from './model';
import view from './view';

export default function ({ DOM, props: { response$ } }) {
  const action$ = indent(DOM);
  const { item$, lockStatus$ } = model(action$, response$);
  const vdom$ = view(lockStatus$);

  const sink = {
    DOM: vdom$,
    item: item$,
    lockStatus: lockStatus$,
  };

  return sink;
}
