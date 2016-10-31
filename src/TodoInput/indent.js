import { Observable } from 'rxjs';

export default function(DOM) {
  const itemValue$ = DOM.select('.addItemInput').events('input').map(({target:{ value }}) => value);
  const addItem$ = Observable.merge(
    DOM.select('.addBtn').events('click').mapTo(null),
    DOM.select('.addItemInput').events('keyup').filter(e => e.code === 'Enter').mapTo(null)
  );

  return { itemValue$, addItem$ };
}
