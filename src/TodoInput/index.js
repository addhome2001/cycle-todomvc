import indent from './indent';
import model from './model';
import view from './view';

export default function(DOM) {
  const state$ = model(indent(DOM));
  const vdom$ = view(state$);

  const sink = {
    DOM: vdom$,
    item: state$
  }

  return sink;
}
