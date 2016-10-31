import { h } from '@cycle/dom';

export default function(state$) {
  return state$.map(([text, complete]) =>
    h('li.item', [
      h('label.check', [
        h('span.box', { class: { checkedBox: complete } }),
        h('input.complete', { props: { type: 'checkbox', checked: complete } }),
      ]),
      h('div.text', { class: { checked: complete } }, text),
      h('div.remove')])
  )
}
