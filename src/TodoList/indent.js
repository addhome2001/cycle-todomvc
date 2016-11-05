import { Collection } from '../helper';
import TodoItem from '../TodoItem';

export default function(DOM, props$) {
  //Component
  const filterStatus$ = DOM.select('.filter').events('click').map(({ target: { value } }) => value);

  const add$ = props$.filter(val => val.length > 0).map(val => ({ add$: Observable.of(val.trim()) }));
  const items$ = Collection(TodoItem, { DOM }, add$, item => item.remove$);

  return { items$ , filterStatus$ }
}
