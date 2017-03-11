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
    remove$
      .withLatestFrom(completeStatus$)
      // index of status is completeStatus
      .map(status => status[1] ? 0 : -1),
  );

  const item$ = Observable.combineLatest(
    completeStatus$,
    inputText$,
    inputEditable$,
  );

  return { counter$, item$, completeStatus$ };
}
