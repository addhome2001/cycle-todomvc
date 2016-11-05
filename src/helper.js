import rxjsAdapter from '@cycle/rxjs-adapter';
import { makeCollection } from '@cycle/collection';

export const Collection = makeCollection(rxjsAdapter);

export const filterTrigger = {
  All: () => true,
  Active: complete => !complete,
  Completed: complete => complete
}
