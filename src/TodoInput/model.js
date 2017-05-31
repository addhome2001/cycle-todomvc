import * as actions from '../modules';

export default function (inputValue$) {
  // prevent value is empty or space (using by ajax)
  const addTodo$ =
    inputValue$
      .map(val => val.trim())
      .filter(val => val.length > 0)
      .map(actions.addTodo);

  // blur input after submit inputText
  // item$ => send request
  const lockInput$ = addTodo$.mapTo(true).startWith(null);

  return { addTodo$, lockInput$ };
}
