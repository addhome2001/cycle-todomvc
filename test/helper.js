import ava from 'ava';
import { Observable, ReplaySubject } from 'rxjs';
import { getItem, sendItem, getInitialItems$ } from '../src/helper';

ava('should receive parsed json response', (t) => {
  const expect = ['todo-1', 'todo-2', 'todo-3'];
  const reqSubject$ = new ReplaySubject();
  const response$ = getItem([reqSubject$]);

  reqSubject$.next(Observable.of({ text: JSON.stringify({ title: 'todo-1' }) }));
  reqSubject$.next(Observable.of({ text: JSON.stringify({ title: 'todo-2' }) }));
  reqSubject$.next(Observable.of({ text: JSON.stringify({ title: 'todo-3' }) }));
  reqSubject$.complete();

  return response$
    .scan((arr, curr) => arr.concat(curr), [])
    .last()
    .map(result => t.deepEqual(result, expect));
});

ava('should send request Observable', (t) => {
  const expect = [
    {
      category: 'setItems',
      method: 'POST',
      send: { title: 'todo-1' },
    },
    {
      category: 'setItems',
      method: 'POST',
      send: { title: 'todo-2' },
    },
    {
      category: 'setItems',
      method: 'POST',
      send: { title: 'todo-3' },
    },
  ];
  const reqSubject$ = new ReplaySubject();
  const request$ = sendItem(reqSubject$);
  reqSubject$.next('todo-1');
  reqSubject$.next('todo-2');
  reqSubject$.next('todo-3');
  reqSubject$.complete();

  return request$
    .map(({ category, method, send }) => ({ category, method, send }))
    .scan((arr, curr) => arr.concat(curr), [])
    .last()
    .map(result => t.deepEqual(result, expect));
});

ava('should send initial request Observable', (t) => {
  const expect = [
    {
      category: 'getItems',
      method: 'GET',
    },
  ];
  const reqSubject$ = new ReplaySubject();
  const request$ = getInitialItems$;
  reqSubject$.next('todo-1');
  reqSubject$.complete();

  return request$
    .map(({ category, method }) => ({ category, method }))
    .scan((arr, curr) => arr.concat(curr), [])
    .map(result => t.deepEqual(result, expect));
});
