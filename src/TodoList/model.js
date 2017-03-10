import { Observable } from 'rxjs';
import { Collection } from '../helper';

export default function ({ items$, filterOperator$ }) {
  const counter$ =
    Collection
      .merge(items$, item => item.counter$)
      .scan((prev, curr) => prev + curr)
      .startWith(0);

  const collections$ =
    Collection
      .pluck(items$, ({ DOM, completeStatus$ }) =>
        Observable
          .combineLatest(DOM, completeStatus$, filterOperator$)
          .map(([item, complete, filter]) =>
            filter(complete) ? item : false,
          ),
      );

  return Observable.combineLatest(
    counter$,
    collections$,
  );
}
