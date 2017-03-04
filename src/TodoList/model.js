import { Observable } from 'rxjs';
import { Collection } from '../helper';
import { filterTrigger } from '../utils';

export default function ({ items$, filterStatus$ }) {
  const status$ = filterStatus$.startWith('All');
  const operator$ = status$.map(status => filterTrigger[status]);

  const counter$ =
    Collection
      .merge(items$, item => item.counter$)
      .scan((prev, curr) => prev + curr)
      .startWith(0);

  const collections$ =
    Collection
      .pluck(items$, ({ DOM, completeStatus$ }) =>
        Observable.combineLatest(DOM, completeStatus$, operator$),
      );

  return Observable.combineLatest(
    counter$,
    collections$,
    status$,
  );
}
