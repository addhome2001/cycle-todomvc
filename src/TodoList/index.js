import indent from './indent';
import model from './model';
import view from './view';

export default function({ DOM, props: props$ }) {
  const vdom$ = view(model(indent(DOM, props$)));

  const sink = {
    DOM: vdom$
  }

  return sink;
}
