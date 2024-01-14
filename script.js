const tasksDiv = document.querySelector('#tasks-div');
const tasks = document.getElementsByClassName('.task');
const addInput = document.querySelector('#formGroupExampleInput');
const pagination = document.querySelector('.pagination');
const pageMaxTasksCount = 5;
let taskId = 0;
let tasksData;

//Start of application
updateData();
taskId = updateID(taskId);
renderTasks(tasksData.slice(0, pageMaxTasksCount));

addInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && addInput.value) {
    const newTask = { id: taskId, task: addInput.value, completed: false };
    taskId++;
    tasksData.push(newTask);
    postData(tasksData);
    if (tasksData.length > pageMaxTasksCount) {
      addLinkElementsInPagination(tasksData, pageMaxTasksCount);
    } else {
      renderTasks(tasksData.slice(0, pageMaxTasksCount));
    }
    addInput.value = '';
  }
})
