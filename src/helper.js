import rxjsAdapter from '@cycle/rxjs-adapter';
import { makeCollection } from '@cycle/collection';

export const Collection = makeCollection(rxjsAdapter);
