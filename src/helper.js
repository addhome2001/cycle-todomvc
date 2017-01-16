import rxjsAdapter from '@cycle/rxjs-adapter';
import { Observable } from 'rxjs';
import { makeCollection } from '@cycle/collection';
import { getUserApi, setUserApi } from './utils';

export const Collection = makeCollection(rxjsAdapter);

export const filterTrigger = {
  All: () => true,
  Active: complete => !complete,
  Completed: complete => complete,
};

export const titleResponse = response =>
  Observable
    .merge(...response)
    .mergeMap(r$ => r$.pluck('text')
    .map(item => JSON.parse(item).title));

export const titleRequest = inputText$ =>
  inputText$
    .mergeMap(text => Observable.of(setUserApi(text)))
    .merge(Observable.of(getUserApi()));
