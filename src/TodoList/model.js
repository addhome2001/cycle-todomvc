import { Observable } from 'rxjs';
import { Collection } from '../helper';
import * as actions from '../modules';

export default function ({ items$, filterOperator$, deleteCompeleted$, leftAmount$ }) {
  const todoRequest$ = Observable.merge(
    deleteCompeleted$
      .withLatestFrom(items$.pluck('length'), leftAmount$)
      .filter(([, len, amount]) => len !== amount)
      .map(actions.removeCompeleteTodos),
    Collection.merge(items$, item => item.HTTP),
  );

  const collections$ =
    Collection
      .pluck(items$, ({ DOM, checked$ }) =>
        Observable
          .combineLatest(DOM, checked$, filterOperator$,
            (dom, checked, filter) =>
              filter(checked) && dom,
          ),
      );

  return { collections$, todoRequest$ };
}
