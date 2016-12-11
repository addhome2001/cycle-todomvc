import { Observable } from 'rxjs';
import { h } from '@cycle/dom';
import { Collection, filterTrigger } from '../helper';

export default function ({ items$, filterStatus$ }) {
  const status$ = filterStatus$.startWith('All');
  const filter$ = status$.map(status => filterTrigger[status]);

  const counter$ =
    Collection
      .merge(items$, item => item.counter$)
      .scan((prev, curr) => prev + curr)
      .startWith(0);

  const itemsVdom$ = Observable.combineLatest(
    filter$,
    Collection.pluck(items$, ({ DOM, completeStatus$ }) =>
      Observable.combineLatest(DOM, completeStatus$),
    ),
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
