import { h } from '@cycle/dom';

export default function (state$) {
  return state$.map(lock =>
    [
      h('input.addItemInput', {
        hook: {
          update: (old, { elm }) => {
            if (lock) {
              // after submit
              elm.blur();
              elm.value = '';
            } else {
              // after receive response
              elm.focus();
            }
          },
        },
        props: { placeholder: 'What To Do', maxLength: 40 },
      }),
      h('button.addBtn', '+'),
    ],
  );
}
