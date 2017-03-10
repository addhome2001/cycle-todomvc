import { h } from '@cycle/dom';

const renderFilterInput = (purpose, filter) =>
  h('label', [
    h('input.filter', { props: { type: 'radio', name: 'filter', value: purpose, checked: filter === purpose } }),
    h('span', purpose),
  ]);

export default function (state$) {
  return state$.map(status =>
    [
      h('div.filterArea', [
        renderFilterInput('All', status),
        renderFilterInput('Active', status),
        renderFilterInput('Completed', status),
      ]),
    ],
  );
}
