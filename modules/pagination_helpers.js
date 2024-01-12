function addPaginationLink(data, pagination, pageMaxTasksCount) {
  pagination.innerHTML = '';
  const linksCount = Math.ceil(data.length / pageMaxTasksCount);
  for (let i = 1; i <= linksCount; i++) {
    pagination.insertAdjacentHTML('beforeend',
      `<li class="page-item d-flex justify-content-center align-items-center">
       <button class="btn btn-link page-link ps-3 pe-3 p-1 fs-5 ${i === linksCount && 'activeLink'}">${i}</button>
      </li>`);
  }
  const notes = listCalculation(data, linksCount, pageMaxTasksCount);
  paginationNexPrev(notes, linksCount);
}
function paginationLinkAddClick(tasksData, pageMaxTasksCount) {
  const pageLinks = document.querySelectorAll('.pagination .page-link');
  for (const link of pageLinks) {
    link.onclick = function (event) {
      let clickedPage = +event.target.innerHTML;
      const notes = listCalculation(tasksData, clickedPage, pageMaxTasksCount);
      paginationNexPrev(notes, clickedPage);
      pageLinks.forEach(elem => {
        elem === link ? elem.classList.add('activeLink') : elem.classList.remove('activeLink')
      });
    }
  }
}
function listCalculation(tasksData, currentPage, pageMaxTasksCount) {
  let start = (currentPage - 1) * pageMaxTasksCount;
  let end = start + pageMaxTasksCount;
  return tasksData.slice(start, end);
}
function paginationNexPrev(data, clickedPage) {
  const tasksDiv = document.querySelector('#tasks-div');
  const currentPage = document.querySelector('.activeLink');
  if (+currentPage.innerHTML !== clickedPage) {
    tasksDiv.innerHTML = '';
    for (task of data) {
      tasksDiv.appendChild(createTaskElement(data, task))
    }
  }

}