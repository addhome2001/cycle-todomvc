import { Observable } from 'rxjs';

export default function({ complete$, add$, remove$ }) {
  const removeCounter$ = remove$.startWith("");
  const counter$ =
    complete$
      .merge(add$)
      .map(c => !c || c.length ? 1 : -1)
      .combineLatest(removeCounter$, (count, remove) => !remove ? count : (count > 0) ? -1 : 0);
  const addItem$ = Observable.combineLatest(complete$.startWith(false), add$);

  return { counter$, addItem$ }
}
