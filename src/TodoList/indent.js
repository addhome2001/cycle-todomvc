export default function (DOM) {
  const filterStatus$ = DOM.select('.filter').events('change').pluck('target', 'value');
  const deleteCompeleted$ = DOM.select('.deleteCompeleted').events('click').mapTo(null);

  return { filterStatus$, deleteCompeleted$ };
}
