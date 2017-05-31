import { Observable } from 'rxjs';
import * as actions from '../modules';

export default function ({ item$, removeTodo$, editable$, update$, checkTodo$ }) {
  const checked$ = item$.pluck('checked');
  const id$ = item$.pluck('_id');
  const content$ = item$.pluck('content');

  const itemInfo$ = Observable.combineLatest(
    checked$,
    content$,
    editable$.startWith(false),
  );

  const todoRequest$ = id$.concatMap(id =>
    Observable.merge(
      checkTodo$
        .withLatestFrom(checked$)
        .filter(([checked, oldChecked]) => checked !== undefined && checked !== oldChecked)
        .map(([checked]) => actions.updateTodo(id, { checked })),
      removeTodo$
        .map(() => actions.removeTodo(id)),
      update$
        .withLatestFrom(content$)
        .filter(([content, oldContent]) => content.length > 0 && content !== oldContent)
        .map(([content]) => actions.updateTodo(id, { content })),
    ),
  );

  return { itemInfo$, checked$, todoRequest$ };
}
