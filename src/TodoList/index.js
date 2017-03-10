import { Observable } from 'rxjs';
import indent from './indent';
import model from './model';
import view from './view';

import { Collection } from '../helper';

// Component
import TodoItem from '../TodoItem';
import TodoFilter from '../TodoFilter';

export default function ({ DOM, props: { response$ } }) {
  const { deleteCompeleted$ } = indent(DOM);

  // TodoFilter
  const { DOM: TodoFilter$, filterOperator$ } = TodoFilter(DOM);

  const items$ =
    Collection(TodoItem, { DOM },
      response$.map(val => ({ add$: Observable.of(val) })),
      ({ remove$, completeStatus$ }) =>
        remove$.merge(
          completeStatus$
            .sample(deleteCompeleted$)
            .filter(complete => complete),
      ));

  const state$ =
    // concat TodoFilter vdom with state
    model({ items$, filterOperator$ })
      .combineLatest(TodoFilter$,
        (state, filter) => state.concat(filter),
      );

  const vdom$ = view(state$);

  const sink = {
    DOM: vdom$,
  };

  return sink;
}
