import indent from './indent';
import model from './model';
import view from './view';

export default function(DOM) {
  const itemValue$ = model(indent(DOM));
  const vdom$ = view(itemValue$);

  const sink = {
    DOM: vdom$,
    item: itemValue$
  }

  return sink;
}
