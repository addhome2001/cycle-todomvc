import { Observable } from 'rxjs';

export default function (DOM) {
  const removeTodo$ = DOM.select('.remove').events('click').mapTo(true);
  const checkTodo$ = DOM.select('.check').events('click').pluck('target', 'checked');
  const enterKeyup$ = DOM.select('.edit').events('keyup').filter(e => e.code === 'Enter');
  const editText$ = DOM.select('.edit').events('blur');
  const disabledLock$ = DOM.select('.text').events('dblclick').mapTo(true);

  const editable$ = Observable.merge(
    disabledLock$,
    editText$.mapTo(false),
    enterKeyup$.mapTo(false),
  );

  const update$ = Observable.merge(
    editText$,
    enterKeyup$,
  ).pluck('target', 'value');

  return { removeTodo$, checkTodo$, editable$, update$ };
}
