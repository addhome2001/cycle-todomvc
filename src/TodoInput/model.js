import { Observable } from 'rxjs';

export default function (itemValue$, props$) {
  // prevent value is empty or space (using by ajax)
  const item$ =
    itemValue$
      .map(val => val.trim())
      .filter(val => val.length > 0);

  // focus input after recive response
  // blur input after submit inputText
  // combine above stream to change input's status
  // state$ => send request
  // props$ => receive response
  const lockStatus$ = Observable.merge(item$.mapTo(true), props$.mapTo(false));

  return { item$, lockStatus$ };
}
