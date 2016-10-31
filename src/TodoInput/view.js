import { h } from '@cycle/dom';

export default function(state$) {
  return state$.map(() =>
    [
      h('input.addItemInput', {
        hook: { update:(old, {elm})=> elm.value="" },
        props: { placeholder: "What To Do" }
      }),
      h('button.addBtn', '+')
    ]
  );
}
