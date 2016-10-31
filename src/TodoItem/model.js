import { Observable } from 'rxjs';

export default function({ complete$, add$ }) {
  return Observable.combineLatest(add$, complete$.startWith(false));
}
