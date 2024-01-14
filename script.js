const $ = document;
const tasksDiv = $.querySelector('#tasks-div');
const tasks = $.getElementsByClassName('.task');
const addInput = $.querySelector('#formGroupExampleInput');
const pagination = $.querySelector('.pagination');
const pageMaxTasksCount = 5;
let taskId = 0;
let tasksData;

updateData();
taskId = updateID(taskId);
renderTasks(tasksData.slice(0, pageMaxTasksCount));
console.log(taskId);
addInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && addInput.value) {
    const newTask = { id: taskId, task: addInput.value, completed: false };
    taskId++;
    tasksData.push(newTask);
    postData(tasksData);
    renderTasks(tasksData.slice(0, pageMaxTasksCount));
    addInput.value = '';
  }
})
