import ava from 'ava';
import { filterTrigger } from '../../src/utils';

ava('Test function filterTrigger', (t) => {
  t.true(filterTrigger.All(), 'should method All return true if not passing argument.');
  t.true(filterTrigger.All(false), 'should method All return true if passing false.');

  t.false(filterTrigger.Active(true), 'should method Active return false if passing true.');
  t.true(filterTrigger.Active(false), 'should method Active return true if passing false.');

  t.true(filterTrigger.Completed(true), 'should method Completed return true if passing true.');
  t.false(filterTrigger.Completed(false), 'should method Completed return false if passing false.');
});
