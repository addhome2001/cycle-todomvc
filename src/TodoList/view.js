import { h } from '@cycle/dom';

const renderItems = collections =>
  collections.map(collection =>
    collection || h('li', { style: { display: 'none' } }),
  );

export default function view(state$) {
  return state$.map(([collections, filter, amount]) =>
    [
      h('ul.items', [
        ...renderItems(collections),
        h('li.info', [
          h('div.itemCount', [`${amount} items left`]),
          filter,
          h('div.deleteCompeleted', 'Delete Compeleted'),
        ]),
      ]),
    ],
  );
}
