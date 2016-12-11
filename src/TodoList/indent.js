import { Observable } from 'rxjs';
import { Collection } from '../helper';
import TodoItem from '../TodoItem';

export default function (DOM, props$) {
  const filterStatus$ = DOM.select('.filter').events('change').pluck('target', 'value');
  const deleteCompeleted$ = DOM.select('.deleteCompeleted').events('click').mapTo(null);
  const add$ =
    props$
      .filter(val => val.length > 0)
      .map(val => ({ add$: Observable.of(val.trim()) }));

  const items$ =
    Collection(TodoItem, { DOM }, add$,
      ({ remove$, completeStatus$ }) => remove$.merge(
        completeStatus$.sample(deleteCompeleted$).filter(complete => complete),
      ));

  return { items$, filterStatus$, deleteCompeleted$ };
}
