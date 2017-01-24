import rxjsAdapter from '@cycle/rxjs-adapter';
import { Observable } from 'rxjs';
import { makeCollection } from '@cycle/collection';
import { getUserApi, setUserApi } from './utils/api';

export const Collection = makeCollection(rxjsAdapter);

export const titleResponse = response =>
  Observable
    .merge(...response)
    .mergeMap(r$ => r$.pluck('text')
    .map(item => JSON.parse(item).title));

export const titleRequest = inputText$ =>
  inputText$
    // Throw away all emitted values that take less then 1s
    .debounceTime(1000)
    .mergeMap(text => Observable.of(setUserApi(text)))
    .merge(Observable.of(getUserApi()));
