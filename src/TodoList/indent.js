export default function (DOM) {
  const deleteCompeleted$ = DOM.select('.deleteCompeleted').events('click').mapTo(null);

  return { deleteCompeleted$ };
}
