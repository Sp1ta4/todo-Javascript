const $ = document;
const tasksDiv = $.querySelector('#tasks-div');
const tasks = $.getElementsByClassName('.task');
const addInput = $.querySelector('#formGroupExampleInput');
const pagination = $.querySelector('.pagination');
const pageMaxTasksCount = 5;
let tasksData;



window.addEventListener('load', () => {
  tasksData = JSON.parse(localStorage.getItem("todos")) || [];
  tasksData.length >= 5 && addPaginationLink(tasksData, pagination, pageMaxTasksCount);
  renderTasks(tasksData.slice(0, pageMaxTasksCount), tasksDiv);
  paginationLinkAddClick(tasksData, pageMaxTasksCount, tasksDiv);
});

addInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    const newTask = { id: _.uniqueId(), task: addInput.value, completed: false };
    tasksData.push(newTask);
    localStorage.setItem("todos", JSON.stringify(tasksData));
    if ((tasksData.length > 1) && !((tasksData.length - 1) % pageMaxTasksCount)) {
      addPaginationLink(tasksData, pagination, pageMaxTasksCount);
      paginationLinkAddClick(tasksData, pageMaxTasksCount, tasksDiv);
    } else if (tasksData.length === 1) {
      tasksDiv.innerHTML = '';
      tasksDiv.appendChild(createTaskElement(tasksData, newTask))
    } else {
      tasksDiv.appendChild(createTaskElement(tasksData, newTask))
    }
    addInput.value = '';

  }
})
