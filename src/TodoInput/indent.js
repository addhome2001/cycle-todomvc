import { Observable } from 'rxjs';

export default function (DOM) {
  const itemValue$ = DOM.select('.addItemInput').events('input').pluck('target', 'value');
  const addBtn$ = DOM.select('.addBtn').events('click');
  const submitItem$ = DOM.select('.addItemInput').events('keyup').filter(e => e.code === 'Enter');

  const addItem$ = Observable.merge(
    addBtn$,
    submitItem$,
  );

  return itemValue$.sample(addItem$).startWith('');
}
