//Function for interaction with tasks 
function renderTasks(tasksArray) {
  tasksArray.length ? tasksDiv.innerHTML = createTasksHtml(tasksArray) : addImageForEmptyData(tasksDiv)
}

function createTasksHtml(tasksData) {
  const tasksHtml = tasksData.map(task => {
    return (`
      <div class="task d-flex align-items-center position-relative" id="${task.id}">
      <div class="checkbox-wrapper-52 p-3 ps-3 d-flex">
            <div class="item d-flex align-items-center">
        ${task.completed ?
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="#18CDA6" onmousedown="toggleTaskCompletion(${task.id})" class="btn btn-link p-0 m-0">
            <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688  z"></path>
          </svg>`
        : `<div class="btn border rounded p-0 m-0" style="width:22px; height:22px" onmousedown="toggleTaskCompletion(${task.id})"></div>`}
      </div>
            <span class="${task.completed ? "cbx-lbl ms-3 text-muted text-decoration-line-through" : "cbx-lbl ms-3"}">${task.task}</span>
        </div>
    <div class="buttons position-absolute end-0 d-flex justify-content-center align-items-center mt-1 me-4 p-2 ps-3 pe-3">
      <div class="button d-flex justify-content-center align-items-center edit-btn" onclick="editTask(tasksData, ${task.id})">
        <span class="material-symbols-outlined">
          edit
        </span>
      </div>
      <div class="button d-flex justify-content-center align-items-center ms-4 delete-btn" onclick="deleteTask( ${task.id})">
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>
      </div>
    `)
  }).join('');
  return tasksHtml;
}

function toggleTaskCompletion(id) {
  const updatedTask = tasksData.find(task => +task.id === id);
  updatedTask.completed = !updatedTask.completed;
  postData(tasksData);
  updateCompleted(updatedTask);
}

function updateCompleted(obj) {
  const taskElement = getHtmlElementById(obj.id);
  taskElement.innerHTML = `
    <div class="checkbox-wrapper-52 p-3 ps-3 d-flex" >
      <div class="item d-flex align-items-center">
        ${obj.completed ?
      `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="#18CDA6" onmousedown="toggleTaskCompletion(${obj.id})" class="btn btn-link p-0 m-0">
            <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688  z"></path>
          </svg>`
      : `<div class="btn border rounded p-0 m-0" style="width:22px; height:22px" onmousedown="toggleTaskCompletion(${obj.id})"></div>`}
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

function deleteTask(id) {
  debugger
  const tasksDiv = document.querySelector('#tasks-div');
  const taskElement = document.getElementById(id);
  const currentPage = Math.ceil(tasksData.findIndex(task => task.id === id) / pageMaxTasksCount);
  const updatedData = tasksData.filter(elem => id !== +elem.id);
  postData(updatedData);
  updateData();
  taskElement.remove();
  if (tasksData.length) {
    linksCount = Math.ceil(tasksData.length / pageMaxTasksCount);
    addLinkElementsInPagination(linksCount);
    renderTasks(listCalculation(tasksData, currentPage, pageMaxTasksCount));
  } else {
    addImageForEmptyData(tasksDiv);
  }
}

function updateTask(task, id) {
  tasksData.map(elem => +elem.id === id ? elem.task = task : elem);
  postData(tasksData);
  updateData();
  updateCompleted(tasksData.find(elem => +elem.id === id));
}

function editTask(tasksData, id) {
  const updatedTask = tasksData.find(elem => +elem.id === id);
  const taskElement = getHtmlElementById(id);
  taskElement.innerHTML = `<div class="checkbox-wrapper-52 p-3 ps-3 d-flex">
            <div class="item d-flex align-items-center">
        ${updatedTask.completed ?
      `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24" fill="#18CDA6" onmousedown="toggleTaskCompletion(${updatedTask.id})" class="btn btn-link p-0 m-0">
            <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688  z"></path>
          </svg>`
      : `<div class="btn border rounded p-0 m-0" style="width:22px; height:22px" onmousedown="toggleTaskCompletion(${updatedTask.id})"></div>`}
      </div>
            <div class="editDiv d-flex">
              <input type="text" class="form-control ms-3" id="editTaskInput" value="${updatedTask.task}" maxlength="43">
              <div class="btn btn-link p-2" onclick="(() => updateTask(this.parentNode.firstElementChild.value, ${id}))()">
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

//Interaction with html
function getHtmlElementById(id) {
  return document.getElementById(id)
}

//Clear div function
function addImageForEmptyData(div) {
  div.innerHTML = `
              <div class="d-flex flex-column justify-content-center align-items-center" style="min-height: 290px !important;">
                  <img src="./images/empty.png" alt="empty" width="100" height="100">
                  <h5 class="text-secondary">You have not added any tasks yet</h5>
              </div>`
}

//API functions
function postData(data) {
  localStorage.setItem("todos", JSON.stringify(data));
}

function updateData() {
  tasksData = JSON.parse(localStorage.getItem("todos")) || [];
}

//ID function
function updateID(id) {
  id = tasksData.at(-1)?.id + 1 || 0;
  return id
}