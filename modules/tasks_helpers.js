function renderTasks(tasksArray, tasksDiv) {
  tasksArray.length ? tasksArray.forEach(elem => {
    tasksDiv.appendChild(createTaskElement(tasksArray, elem));
  }) : addClearList(tasksDiv)
}
function updateCompleted(taskElement, tasksData, obj) {
  taskElement.innerHTML = `
    <div class="checkbox-wrapper-52 p-3 ps-3 d-flex" >
      <div class="item d-flex align-items-center">
        ${obj.completed ?
      `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="#18CDA6" onmousedown="toggleCompleted(tasksData, ${obj.id})" class="btn btn-link p-0 m-0">
            <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688  z"></path>
          </svg>`
      : `<div class="btn border rounded p-0 m-0" style="width:22px; height:22px" onmousedown="toggleCompleted(tasksData, ${obj.id})"></div>`}
      </div>
      <span class="${obj.completed ? "cbx-lbl ms-3 text-muted text-decoration-line-through" : "cbx-lbl ms-3"}">${obj.task}</span>
    </div>
    <div class="buttons position-absolute end-0 d-flex justify-content-center align-items-center mt-1 me-4 p-2 ps-3 pe-3">
      <div class="button d-flex justify-content-center align-items-center edit-btn" onclick="editTask(tasksData, ${obj.id})">
        <span class="material-symbols-outlined">
          edit
        </span>
      </div>
      <div class="button d-flex justify-content-center align-items-center ms-4 delete-btn" onclick="deleteTask(${obj.id})">
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>`;
}
function createTaskElement(tasksData, obj) {
  const task = document.createElement('div');
  task.className = 'task d-flex align-items-center position-relative';
  task.id = obj.id;
  task.innerHTML = `
      <div class="checkbox-wrapper-52 p-3 ps-3 d-flex">
            <div class="item d-flex align-items-center">
        ${obj.completed ?
      `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="#18CDA6" onmousedown="toggleCompleted(tasksData, ${obj.id})" class="btn btn-link p-0 m-0">
            <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688  z"></path>
          </svg>`
      : `<div class="btn border rounded p-0 m-0" style="width:22px; height:22px" onmousedown="toggleCompleted(tasksData, ${obj.id})"></div>`}
      </div>
            <span class="cbx-lbl ms-3">${obj.task}</span>
        </div>
    <div class="buttons position-absolute end-0 d-flex justify-content-center align-items-center mt-1 me-4 p-2 ps-3 pe-3">
      <div class="button d-flex justify-content-center align-items-center edit-btn" onclick="editTask(tasksData, ${obj.id})">
        <span class="material-symbols-outlined">
          edit
        </span>
      </div>
      <div class="button d-flex justify-content-center align-items-center ms-4 delete-btn" onclick="deleteTask( ${obj.id})">
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>`;
  return task;
}
function toggleCompleted(tasksData, id) {
  const updatedTask = tasksData.find(elem => +elem.id === id);
  updatedTask.completed = !updatedTask.completed;
  localStorage.setItem("todos", JSON.stringify(tasksData));
  updateCompleted(document.getElementById(updatedTask.id), tasksData, updatedTask);
}
function deleteTask(id) {
  const taskData = localStorage.getItem("todos") || [];
  const tasksDiv = $.querySelector('#tasks-div');
  const taskElement = document.getElementById(id);
  tasksData = tasksData.filter(elem => id !== +elem.id);
  localStorage.setItem("todos", JSON.stringify(tasksData));
  taskElement.parentNode.removeChild(taskElement);
  !tasksData.length && addClearList(tasksDiv);
}
function updateTask(task, tasksData, id) {
  const updatedTask = tasksData.find(elem => +elem.id === id);
  tasksData.map(elem => +elem.id === id ? elem.task = task : elem);
  localStorage.setItem("todos", JSON.stringify(tasksData));
  updateCompleted(document.getElementById(updatedTask.id), tasksData, updatedTask);
}
function editTask(tasksData, id) {
  const updatedTask = tasksData.find(elem => +elem.id === id);
  const taskElement = document.getElementById(id);
  taskElement.innerHTML = `<div class="checkbox-wrapper-52 p-3 ps-3 d-flex">
            <div class="item d-flex align-items-center">
        ${updatedTask.completed ?
      `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="#18CDA6" onmousedown="toggleCompleted(tasksData,${updatedTask.id})" class="btn btn-link p-0 m-0">
            <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688  z"></path>
          </svg>`
      : `<div class="btn border rounded p-0 m-0" style="width:22px; height:22px" onmousedown="toggleCompleted(tasksData,${updatedTask.id})"></div>`}
      </div>
            <div class="editDiv d-flex">
              <input type="text" class="form-control ms-3" id="formGroupExampleInput" value="${updatedTask.task}" maxlength="43">
              <div class="btn btn-link p-2" onclick="(() => updateTask(this.parentNode.firstElementChild.value, tasksData, ${id}))()">
                <span class="material-symbols-outlined">
                  done
                </span>
              </div>
            </div>
        </div>
    <div class="buttons position-absolute end-0 d-flex justify-content-center align-items-center mt-1 me-4 p-2 ps-3 pe-3">
      <div class="button d-flex justify-content-center align-items-center edit-btn" onclick="editTask(tasksData, ${id})">
        <span class="material-symbols-outlined">
          edit
        </span>
      </div>
      <div class="button d-flex justify-content-center align-items-center ms-4 delete-btn" onclick="deleteTask(${id})">
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>`;
}
function addClearList(div) {
  div.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center" style="min-height: 290px !important;">
                <img src="./images/empty.png" alt="empty" width="100" height="100">
                <h5 class="text-secondary">You have not added any tasks yet</h5>
            </div>`
}