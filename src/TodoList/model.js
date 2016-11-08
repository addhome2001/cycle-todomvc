import { Observable } from 'rxjs';
import { h } from '@cycle/dom';
import { Collection, filterTrigger } from '../helper';

export default function ({ items$, filterStatus$ }){
  const status$ = filterStatus$.startWith('All');
  const filter$ = status$.map(status => filterTrigger[status]);

  return Observable.combineLatest(
    Collection.merge(items$, item => item.counter$).startWith(0).scan((prev, curr) => prev + curr),
    Collection.pluck(items$, ({ DOM, completeStatus$ }) =>
      Observable.combineLatest(DOM, completeStatus$, filter$,
        (DOM, completeStatus, filter) =>
          filter(completeStatus) ? DOM : h('li', {style: {display: 'none'}})
      ),
    ),
    status$
  )
}
