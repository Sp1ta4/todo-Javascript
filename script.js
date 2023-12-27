const $ = document;
const tasksDiv = $.querySelector('#tasks-div')
const tasks = $.getElementsByClassName('.task');
const addInput = $.querySelector('#formGroupExampleInput');
let tasksData;

window.addEventListener('load', () => {
  console.log('lox');
  tasksData = JSON.parse(localStorage.getItem("todos")) || [];
  tasksData.length && renderTasks(tasksData);
});

addInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    const newTask = { id: _.uniqueId(), task: addInput.value, completed: false };
    tasksData.push(newTask);
    localStorage.setItem("todos", JSON.stringify(tasksData));
    addInput.value = '';
    tasksDiv.appendChild(createElement(newTask));
  }
})

function renderTasks(tasksArray) {
  tasksArray.forEach(elem => tasksDiv.appendChild(createElement(elem)))
}

function updateDeleted(taskElement) {
  tasks.removeChild(taskElement);
}

function updateCompleted(taskElement, obj) {
  taskElement.innerHTML = `
  <div class="checkbox-wrapper-52 p-3 ps-3 d-flex">
            <div class="item d-flex align-items-center">
                ${obj.completed ? `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="#18CDA6" onmousedown="toggleCompleted(${obj.id})" class="btn btn-link p-0 m-0">
                    <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
                    </svg>`
      : `<div class="btn border rounded p-0 m-0" style="width:22px; height:22px" onmousedown="toggleCompleted(${obj.id})"></div>`}
            </div>
            <span class="${obj.completed ? "cbx-lbl fs-3 ms-3 text-muted text-decoration-line-through" : "cbx-lbl fs-3 ms-3"}">${obj.task}</span>
        </div >
    <div class="buttons position-absolute end-0 d-flex mt-1 me-4 p-2 ps-3 pe-3">
      <div class="button edit-btn">
        <span class="material-symbols-outlined">
          edit
        </span>
      </div>
      <div class="button ms-4 delete-btn" onclick="deleteTask(${obj.id})">
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>`;
}

function createElement(obj) {
  const task = document.createElement('div');
  task.className = 'task d-flex align-items-center position-relative';
  task.id = obj.id;
  task.innerHTML = `
      <div class="checkbox-wrapper-52 p-3 ps-3 d-flex" >
            <div  class="item d-flex align-items-center">
                <div class="btn border rounded p-0 m-0" style="width:22px; height:22px" onmousedown="toggleCompleted(${obj.id})"></div>
            </div>
            <span class="cbx-lbl fs-3 ms-3">${obj.task}</span>
        </div>
    <div class="buttons position-absolute end-0 d-flex mt-1 me-4 p-2 ps-3 pe-3">
      <div class="button edit-btn">
        <span class="material-symbols-outlined">
          edit
        </span>
      </div>
      <div class="button ms-4 delete-btn" onclick="deleteTask(${obj.id})">
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>`;
  return task;
}

function toggleCompleted(id) {
  const updatedTask = tasksData.find(elem => +elem.id === id);
  updatedTask.completed = !updatedTask.completed;
  localStorage.setItem("todos", JSON.stringify(tasksData));
  updateCompleted(document.getElementById(updatedTask.id), updatedTask);
}
function deleteTask(id) {
  tasksData = tasksData.filter(elem => id !== +elem.id);
  const taskElement = document.getElementById(id);
  localStorage.setItem("todos", JSON.stringify(tasksData));
  taskElement.parentNode.removeChild(taskElement);
}
