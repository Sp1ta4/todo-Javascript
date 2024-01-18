const tasksDiv = document.querySelector('#tasks-div');
const tasks = document.getElementsByClassName('.task');
const addInput = document.querySelector('#formGroupExampleInput');
const pagination = document.querySelector('.pagination');
const pageMaxTasksCount = 5;
let taskId = 0;
let tasksData;
let linksCount;
let currentListData;
//Start of application
updateData();
linksCount = Math.ceil(tasksData.length / pageMaxTasksCount);
currentListData = listCalculation(tasksData, linksCount, pageMaxTasksCount);
taskId = updateID(taskId);
renderTasks(currentListData);
addLinkElementsInPagination(linksCount);

addInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && addInput.value) {
    const newTask = { id: taskId.toString(), task: addInput.value, completed: false };
    taskId++;
    tasksData.push(newTask);
    postData(tasksData);
    linksCount = Math.ceil(tasksData.length / pageMaxTasksCount);
    currentListData = listCalculation(tasksData, linksCount, pageMaxTasksCount);
    if (tasksData.length > pageMaxTasksCount && tasksData.length % pageMaxTasksCount === 1) {
      addLinkElementsInPagination(linksCount);
      renderTasks(currentListData);
    } else {
      renderTasks(currentListData);
    }
    addInput.value = '';
  }
})
