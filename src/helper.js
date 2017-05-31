import rxjsAdapter from '@cycle/rxjs-adapter';
import { Observable } from 'rxjs';
import { makeCollection } from '@cycle/collection';
import api from './utils/api';

export const Collection = makeCollection(rxjsAdapter);

export const getResponse$ = response$ =>
  response$
    .mergeMap(r$ =>
      Observable.zip(
        r$.pluck('request', 'category'),
        r$.pluck('body'),
      ))
    .map(([type, payload]) => ({ type, payload }))
    .startWith({});

export const sendRequest$ = request$ =>
  request$.map(action => action(api));
