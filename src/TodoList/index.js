import { Observable } from 'rxjs';
import indent from './indent';
import model from './model';
import view from './view';

import { Collection } from '../helper';

// Component
import TodoItem from '../TodoItem';

export default function ({ DOM, props: { response$ } }) {
  const { filterStatus$, deleteCompeleted$ } = indent(DOM);
  const items$ =
    Collection(TodoItem, { DOM },
      response$.map(val => ({ add$: Observable.of(val) })),
      ({ remove$, completeStatus$ }) => remove$.merge(
        completeStatus$.sample(deleteCompeleted$).filter(complete => complete),
      ));
  const state$ = model({ items$, filterStatus$ });
  const vdom$ = view(state$);

  const sink = {
    DOM: vdom$,
  };

  return sink;
}
