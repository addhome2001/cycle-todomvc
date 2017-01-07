import model from './model';
import view from './view';

export default function (situation) {
  const state$ = model(situation);
  const vdom$ = view(state$);

  const sink = {
    DOM: vdom$,
  };

  return sink;
}
