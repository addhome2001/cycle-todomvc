import indent from './indent';
import model from './model';
import view from './view';

export default function({ DOM, props: props$ }) {
  const action$ = indent(DOM, props$);
  const state$ = model(action$);
  const vdom$ = view(state$);

  const sink = {
    DOM: vdom$
  }

  return sink;
}
