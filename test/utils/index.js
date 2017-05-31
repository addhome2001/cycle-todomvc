import ava from 'ava';
import { filterTrigger, incOrdec, todoFactory } from '../../src/utils';

ava('Test filterTrigger', (t) => {
  t.true(filterTrigger.All(), 'All\'s parameter is empty');
  t.true(filterTrigger.All(false), 'All\'s parameter is false');

  t.false(filterTrigger.Active(true), 'Active\'s parameter is true');
  t.true(filterTrigger.Active(false), 'Active\'s parameter is false');

  t.true(filterTrigger.Checked(true), 'Checked\'s parameter is true');
  t.false(filterTrigger.Checked(false), 'Checked\'s parameter is false');
});

ava('Test incOrdec', (t) => {
  t.is(incOrdec(true, 1), 0, 'decreased by 1');
  t.is(incOrdec(false, 1), 2, 'increased by 1');

  t.is(incOrdec(true, 0), 0, 'decreased of amounts is negative');

  t.is(
    t.throws(() =>
      incOrdec(true, 'NaN'),
    ).message,
   'Amount is not an Number.',
  );
});

ava('Test todoFactory', (t) => {
  const newTodo = { title: 'title', _id: 'id' };

  t.deepEqual(
    todoFactory(newTodo), {
      item$: newTodo,
      _id: 'id',
    },
    'return the newTodo and _id',
  );

  t.deepEqual(
    todoFactory(), {
      item$: {},
      _id: '',
    },
    'empty parameter',
  );
});
