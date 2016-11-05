import { h } from '@cycle/dom';

export default function view(state$) {
  return state$.map(([counter, items]) =>
    [
      h('ul.items', [...items,
        h('li.info', [
          h('div.itemCount', [`${counter} items left`])
        ])
      ]),
    ]
  )
}
