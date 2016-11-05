import { Collection } from '../helper';
import TodoItem from '../TodoItem';

export default function(DOM, props$) {
  const add$ = props$.filter(val => val.length > 0).map(val => ({ add$: Observable.of(val.trim()) }));
  const addItems$ = Collection(TodoItem, { DOM }, add$, item => item.remove$).do(v => console.log(v));
  return { addItems$ }
}
