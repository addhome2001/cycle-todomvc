import { Observable } from 'rxjs';

export default function ({ complete$, add$, remove$, editable$, update$ }) {
  const completeStatus$ = complete$.startWith(false);
  const inputEditable$ = editable$.startWith(false);

  const inputText$ = Observable.merge(
    add$,
    update$,
  ).filter(edit => edit.length > 0);

  const counter$ = Observable.merge(
    // +1 or -1
    complete$.map(c => c ? -1 : +1),
    // +1
    add$.mapTo(1),
    // -1
    remove$.mapTo(-1),
  );

  const addItem$ = Observable.combineLatest(
    completeStatus$,
    inputText$,
    inputEditable$,
  );

  return { counter$, addItem$, completeStatus$ };
}
