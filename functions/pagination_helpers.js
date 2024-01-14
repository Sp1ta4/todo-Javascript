function addLinkElementsInPagination(data, pageMaxTasksCount) {
  const linksCount = Math.ceil(data.length / pageMaxTasksCount);
  let paginationElements = ''
  for (let i = 1; i <= linksCount; i++) {
    paginationElements += `<li class="page-item d-flex justify-content-center align-items-center">
    <button class="btn btn-link page-link ps-3 pe-3 p-1 fs-5" onclick="paginationLinksFunction(this)" id="${i}">${i}</button>
    </li>`;
  }
  pagination.innerHTML = paginationElements;
  const notes = listCalculation(data, linksCount, pageMaxTasksCount);
  renderTasks(notes);
}
function paginationLinksFunction(self) {
  let clickedPage = +self.innerHTML;
  const notes = listCalculation(tasksData, clickedPage, pageMaxTasksCount);
  renderTasks(notes);
  addActiveStateClassToPaginationLinks(self.id);
}
// function addActiveStateClassToPaginationLinks(id) {
//   debugger
//   const paginationLinksElements = document.querySelectorAll('.pagination .page-link');
//   [...paginationLinksElements].map(elem => {
//     return elem.id === id ? elem.classList.add('activeLink') : elem.classList.remove('activeLink');
//   });
// }
function listCalculation(tasksData, currentPage, pageMaxTasksCount) {
  let start = (currentPage - 1) * pageMaxTasksCount;
  let end = start + pageMaxTasksCount;
  return tasksData.slice(start, end);
}
