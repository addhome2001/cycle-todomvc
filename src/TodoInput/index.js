import indent from './indent';
import model from './model';
import view from './view';

export default function ({ DOM }) {
  const action$ = indent(DOM);
  const { addTodo$, lockInput$ } = model(action$);
  const vdom$ = view(lockInput$);

  const sink = {
    DOM: vdom$,
    HTTP: addTodo$,
  };

  return sink;
}
