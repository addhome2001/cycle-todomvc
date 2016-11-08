import { h } from '@cycle/dom';

const renderFilterInput = (purpose, filter) =>
  h('label', [
    h('input.filter', { props: { type: 'radio', name: 'filter', value: purpose, checked: filter === purpose } }),
    h('span', purpose)
  ])

export default function view(state$) {
  return state$.map(([counter, items, filter]) =>
    [
      h('ul.items', [...items,
        h('li.info', [
          h('div.itemCount', [`${counter} items left`]),
          h('div.filterArea', [
            renderFilterInput("All", filter),
            renderFilterInput("Active", filter),
            renderFilterInput("Completed", filter)
          ])
        ])
      ]),
    ]
  )
}
