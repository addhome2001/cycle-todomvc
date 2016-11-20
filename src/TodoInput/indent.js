import { Observable } from 'rxjs';

export default function(DOM) {
  const itemValue$ = DOM.select('.addItemInput').events('input').pluck('target', 'value');
  const addBtn$ = DOM.select('.addBtn').events('click').mapTo(null);
  const submitItem$ = DOM.select('.addItemInput').events('keyup').filter(e => e.code === 'Enter').mapTo(null);

  const addItem$ = Observable.merge(
    addBtn$,
    submitItem$
  );

  return { itemValue$, addItem$ };
}
