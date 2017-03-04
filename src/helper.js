import rxjsAdapter from '@cycle/rxjs-adapter';
import { Observable } from 'rxjs';
import { makeCollection } from '@cycle/collection';
import { getItemsApi, setItemsApi } from './utils/api';

export const Collection = makeCollection(rxjsAdapter);

export const getItem = response =>
  Observable
    .merge(...response)
    .mergeMap(r$ => r$.pluck('text'))
    .map(item => JSON.parse(item).title);

export const sendItem = inputText$ =>
  inputText$
    .mergeMap(text => Observable.of(setItemsApi(text)));

export const getInitialItems$ = Observable.of(getItemsApi());
