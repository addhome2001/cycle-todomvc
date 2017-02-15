import { Observable } from 'rxjs';
import { h } from '@cycle/dom';
import { Collection } from '../helper';
import { filterTrigger } from '../utils';

export default function ({ items$, filterStatus$ }) {
  const status$ = filterStatus$.startWith('All');
  const filter$ = status$.map(status => filterTrigger[status]);

  const counter$ =
    Collection
      .merge(items$, item => item.counter$)
      .scan((prev, curr) => prev + curr)
      .startWith(0);

  const collection$ =
    Collection
      .pluck(items$, ({ DOM, completeStatus$ }) =>
        Observable.combineLatest(DOM, completeStatus$));

  const itemsVdom$ = Observable.combineLatest(
    filter$, collection$,
    (filter, collection) =>
      collection.map(([DOM, completeStatus]) =>
        (filter(completeStatus) ? DOM : h('li', { style: { display: 'none' } })),
      ),
  );

  return Observable.combineLatest(
    counter$,
    itemsVdom$,
    status$,
  );
}
