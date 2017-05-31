import { h } from '@cycle/dom';

export default function (state$) {
  return state$.map(([checked, text, editable]) =>
    h('li', {
      class: { editable },
    },
      [
        h('label.check', [
          h('span.box', { class: { checkedBox: checked } }),
          h('input.checked', { props: { type: 'checkbox', checked } }),
        ]),
        h('div.text', { class: { checked } }, text),
        h('input.edit', {
          props: { type: 'text', value: text, maxLength: 40 },
          hook: {
            update: ({ elm }) => { elm.focus(); },
          },
        }),
        h('div.remove'),
      ]),
  );
}
