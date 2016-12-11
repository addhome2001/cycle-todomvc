import { Observable } from 'rxjs';

export default function ({ complete$, add$, remove$, edit$ }) {
  const removeCounter$ = remove$.startWith('');
  const completeStatus$ = complete$.startWith(false);
  const editable$ = edit$.map(edit => !edit.length).startWith(false);
  const text$ = add$.merge(edit$.filter(edit => edit.length));

  const counter$ =
    complete$
      .merge(add$)
      .map(c => (!c || c.length ? 1 : -1))
      .combineLatest(removeCounter$, (count, remove) => {
        let counter;
        if (!remove) {
          counter = count;
        } else if (count > 0) {
          counter = -1;
        } else {
          counter = 0;
        }
        return counter;
      });
  const addItem$ = Observable.combineLatest(completeStatus$, text$, editable$);

  return { counter$, addItem$, completeStatus$ };
}
