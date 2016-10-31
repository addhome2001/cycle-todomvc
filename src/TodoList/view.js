import { h } from '@cycle/dom';

export default function view(state$) {
  return state$.map(items =>
    [
      h('ul.items', items)
    ]
  )
}
