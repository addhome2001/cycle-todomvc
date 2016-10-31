import { Collection } from '../helper';
import TodoItem from '../TodoItem';

export default function(DOM, props$) {
  const add$ = props$.filter(val => val.length > 0).map(val => ({ add$: Observable.of(val.trim()) }));
  const addItem$ = Collection(TodoItem, { DOM }, add$, item => item.remove$);
  return { addItem$ }
}
