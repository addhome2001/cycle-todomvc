import { Observable } from 'rxjs';
import indent from './indent';
import model from './model';
import view from './view';

export default function ({ DOM, props: props$ }) {
  const action$ = indent(DOM);
  const state$ = model(action$);
  // focus input after recive response
  // blur input after submit inputText
  // combine above stream to change input's status
  const lockStatus$ = Observable.merge(state$.mapTo(true), props$.mapTo(false));
  const vdom$ = view(lockStatus$);

  const item$ =
    // prevent value is empty or space (using by ajax)
    state$
      // Throw away all emitted values that take less then 1s
      .debounceTime(1000)
      .map(val => val.trim())
      .filter(val => val.length > 0);

  const sink = {
    DOM: vdom$,
    item: item$,
    lockStatus: lockStatus$,
  };

  return sink;
}
