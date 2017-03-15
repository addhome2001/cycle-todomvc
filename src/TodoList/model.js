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
          .combineLatest(DOM, completeStatus$)
          .map(([dom, complete]) => ({ dom, complete })),
      );

  // the collections after filter
  const filterCollections$ =
    filterOperator$
      .combineLatest(collections$)
      .map(([filter, items]) =>
        items.map(item => filter(item.complete) ? item.dom : false),
      );

  return Observable.combineLatest(
    counter$,
    filterCollections$,
  );
}
