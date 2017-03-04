import { h } from '@cycle/dom';

const renderItems = collection =>
  collection.map(([DOM, completeStatus, operator]) =>
    operator(completeStatus) ? DOM : h('li', { style: { display: 'none' } }),
  );

const renderFilterInput = (purpose, filter) =>
  h('label', [
    h('input.filter', { props: { type: 'radio', name: 'filter', value: purpose, checked: filter === purpose } }),
    h('span', purpose),
  ]);

export default function view(state$) {
  return state$.map(([counter, collections, status]) =>
    [
      h('ul.items', [...renderItems(collections),
        h('li.info', [
          h('div.itemCount', [`${counter} items left`]),
          h('div.filterArea', [
            renderFilterInput('All', status),
            renderFilterInput('Active', status),
            renderFilterInput('Completed', status),
          ]),
          h('div.deleteCompeleted', 'Delete Compeleted'),
        ]),
      ]),
    ],
  );
}
