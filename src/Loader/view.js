import { h } from '@cycle/dom';

export default function ({ lock$ }) {
  return lock$.map(lock =>
    (lock
    && h('div.loader', {
      attrs: {
        'data-content': 'Loading...',
      },
    })));
}
