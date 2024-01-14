function addLinkElementsInPagination(linksCount) {
  let paginationElements = ''
  if (linksCount >= 2) {
    for (let i = 1; i <= linksCount; i++) {
      paginationElements += `<li class="page-item d-flex justify-content-center align-items-center">
    <button class="btn btn-link page-link ps-3 pe-3 p-1 fs-5" onclick="paginationLinksFunction(this)">${i}</button>
    </li>`;
    }
  }
  pagination.innerHTML = paginationElements;
}
function paginationLinksFunction(self) {
  let clickedPage = +self.innerHTML;
  const notes = listCalculation(tasksData, clickedPage, pageMaxTasksCount);
  renderTasks(notes);
}

function listCalculation(tasksData, currentPage, pageMaxTasksCount) {
  debugger
  let start = ((currentPage - 1) * pageMaxTasksCount) >= 0 ? ((currentPage - 1) * pageMaxTasksCount) : 0;
  let end = start + pageMaxTasksCount;
  return tasksData.slice(start, end);
}
