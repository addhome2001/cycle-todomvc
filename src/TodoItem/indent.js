export default function(DOM) {
  const remove$ = DOM.select('.remove').events('click');
  const complete$ = DOM.select('.complete').events('change').map(e => e.target.checked);

  return { remove$, complete$ };
}
