import view from './view';

export default function ({ props: props$ }) {
  const vdom$ = view(props$);

  const sink = {
    DOM: vdom$,
  };

  return sink;
}
