import { h } from '@cycle/dom';

export default function ({ lock$ }) {
  return lock$.map(lock =>
    // if lockStatus is exist render Loader
    lock
    ? h('div.loader', {
      attrs: {
        'data-content': 'Loading...',
      },
    })
    : null,
  );
}
