import indent from './indent';
import model from './model';
import view from './view';

export default function (DOM) {
  const state$ = model(indent(DOM));
  const vdom$ = view(state$);

  const sink = {
    DOM: vdom$,
    // prevent value is empty or space
    item: state$.map(val => val.trim()).filter(val => val.length > 0),
  };

  return sink;
}
