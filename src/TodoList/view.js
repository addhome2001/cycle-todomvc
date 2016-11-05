import { h } from '@cycle/dom';

export default function view(state$) {
  return state$.map(([counter, items, filter]) =>
    [
      h('ul.items', [...items,
        h('li.info', [
          h('div.itemCount', [`${counter} items left`]),
          h('div.filterArea', [
            h('label', [
              'All',
              h('input.filter', { props: { type: 'radio', name: 'filter', value: 'All', checked: filter === 'All' } })
            ]),
            h('label', [
              'Active',
              h('input.filter', { props: { type: 'radio', name: 'filter', value: 'Active', checked: filter === 'Active' } })
            ]),
            h('label', [
              'Completed',
              h('input.filter', { props: { type: 'radio', name: 'filter', value: 'Completed', checked: filter === 'Completed' } })
            ])
          ])
        ])
      ]),
    ]
  )
}
