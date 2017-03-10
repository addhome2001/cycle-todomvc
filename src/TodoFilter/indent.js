export default function (DOM) {
  const filterStatus$ = DOM.select('.filter').events('change').pluck('target', 'value');

  return { filterStatus$ };
}
