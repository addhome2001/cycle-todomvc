export default function (DOM) {
  const deleteCompletedIcon$ = DOM.select('.deleteCompletedIcon').events('click').mapTo(null);

  return { deleteCompletedIcon$ };
}
