import { h } from '@cycle/dom';

export default function (state$) {
  return state$.map(state => (state && h('div.loader', { attrs: { 'data-content': 'Loading...' } })));
}
