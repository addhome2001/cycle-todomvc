import { h } from '@cycle/dom';

const renderItems = collections =>
  collections.map(collection =>
    collection || h('li', { style: { display: 'none' } }),
  );

export default function view(state$) {
  return state$.map(([counter, collections, filter]) =>
    [
      h('ul.items', [
        ...renderItems(collections),
        h('li.info', [
          h('div.itemCount', [`${counter} items left`]),
          filter,
          h('div.deleteCompeleted', 'Delete Compeleted'),
        ]),
      ]),
    ],
  );
}
