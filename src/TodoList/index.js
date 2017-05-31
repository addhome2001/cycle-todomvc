import indent from './indent';
import model from './model';
import view from './view';

import { Collection } from '../helper';

// Component
import TodoItem from '../TodoItem';
import TodoFilter from '../TodoFilter';

export default function ({ DOM, props: { todos$, leftAmount$ } }) {
  const { deleteCompeleted$ } = indent(DOM);

  // TodoFilter
  const {
    DOM: TodoFilter$,
    filterOperator$,
  } = TodoFilter(DOM);

  const items$ = Collection.gather(TodoItem, { DOM }, todos$, '_id');

  const {
    collections$,
    todoRequest$,
  } = model({
    items$,
    filterOperator$,
    deleteCompeleted$,
    leftAmount$,
  });

  const listInfo$ = collections$
    .withLatestFrom(leftAmount$, TodoFilter$,
      (collections, amount, list) =>
        [collections].concat(list, amount),
    );

  const vdom$ = view(listInfo$);

  const sink = {
    DOM: vdom$,
    HTTP: todoRequest$,
  };

  return sink;
}
