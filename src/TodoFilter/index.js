import indent from './indent';
import model from './model';
import view from './view';
import { filterTrigger } from '../utils';

export default function (DOM) {
  const action$ = indent(DOM);
  const state$ = model(action$);
  const vdom$ = view(state$);

  const sink = {
    DOM: vdom$,
    filterOperator$: state$.map(status => filterTrigger[status]),
  };

  return sink;
}
