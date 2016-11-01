import { Observable } from 'rxjs';

export default function({ complete$, add$ }) {
  const counter$ = complete$.merge(add$).map(c => !c || c.length ? 1 : -1 );
  const addItem$ = Observable.combineLatest(complete$.startWith(false), add$);

  return { counter$, addItem$ }
}
