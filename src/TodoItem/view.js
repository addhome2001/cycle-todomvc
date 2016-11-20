import { h } from '@cycle/dom';

export default function(state$) {
  return state$.map(([complete, text, editable]) =>
    h("li", { class: { editable } }, [
      h('label.check', [
        h('span.box', { class: { checkedBox: complete } }),
        h('input.complete', { props: { type: 'checkbox', checked: complete } }),
      ]),
      h('div.text', { class: { checked: complete } }, text),
      h('input.edit', {
        props: { type: 'text' , value: text },
        hook: {
          update: ({ elm }) => { elm.focus() }
        }
      }),
      h('div.remove')])
  )
}
