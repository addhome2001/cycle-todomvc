import { Observable } from 'rxjs';
import { Collection } from '../helper';

export default function ({ addItem$ }){
  return Observable.combineLatest(
    Collection.merge(addItem$, item => item.counter$).startWith(0).scan((prev, curr) => prev + curr),
    Collection.pluck(addItem$, item => item.DOM)
  )
}
