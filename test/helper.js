import ava from 'ava';
import { Observable, ReplaySubject } from 'rxjs';
import { spy } from 'sinon';
import { getResponse$, sendRequest$ } from '../src/helper';

const mockAction = spy();

ava.beforeEach(() => {
  mockAction.reset();
});

ava('getResponse$ Observable', (t) => {
  const expect = ['todo-1', 'todo-2', 'todo-3'];
  const resSubject$ = new ReplaySubject();
  const response$ = getResponse$(resSubject$);

  resSubject$.next(Observable.of({
    request: { category: 'category' },
    body: 'todo-1',
  }));
  resSubject$.next(Observable.of({
    request: { category: 'category' },
    body: 'todo-2',
  }));
  resSubject$.next(Observable.of({
    request: { category: 'category' },
    body: 'todo-3',
  }));
  resSubject$.complete();

  return response$
    .skip(1)
    .scan((arr, curr) => arr.concat(curr.payload), [])
    .last()
    .map(result => t.deepEqual(result, expect));
});

ava('sendRequest$ Observable', (t) => {
  const reqSubject$ = new ReplaySubject();
  const request$ = sendRequest$(reqSubject$);

  reqSubject$.next(mockAction);
  reqSubject$.next(mockAction);
  reqSubject$.next(mockAction);
  reqSubject$.complete();

  return request$
    .last()
    .map(() => t.is(mockAction.callCount, 3));
});
