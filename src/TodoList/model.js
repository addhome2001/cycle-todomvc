import { Observable } from 'rxjs';
import { Collection } from '../helper';

export default function ({ addItems$ }){
  return Observable.combineLatest(
    Collection.merge(addItems$, item => item.counter$).startWith(0).scan((prev, curr) => prev + curr),
    Collection.pluck(addItems$, item => item.DOM)
  )
}
