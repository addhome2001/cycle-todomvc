import model from './model';
import view from './view';

export default function ({ props: props$ }) {
  const state$ = model(props$);
  const vdom$ = view(state$);

  const sink = {
    DOM: vdom$,
  };

  return sink;
}
