const createBtn = document.querySelector(".add-task-btn");
const taskForm = document.querySelector(".add-task-form input");
const taskBoard = document.querySelector(".task-cards-board");
const deleteBtn = document.querySelectorAll(".delete-btn");
const doneBtn = document.querySelectorAll(".done-btn");
const tabs = document.querySelectorAll(".status-category a");
const underlineEl = document.querySelector("#underline");
const menuTab = document.querySelectorAll(".status");
let mode = "all";
let taskList = [];
let filteredList = [];
let list = [];

createBtn.addEventListener("click", addTask);
tabs.forEach((tab) => {
  tab.addEventListener("click", function (event) {
    filter(event);
  });
});

function addTask(e) {
  e.preventDefault();
  let task = {
    id: Date.now(),
    taskName: taskForm.value,
    isCompleted: false,
  };
  if (taskForm.value == "") {
    return;
  }
  taskList.push(task);
  taskForm.value = "";
  renderList();
}

function renderList() {
  let resultHtml = "";
  list = [];
  if (mode == "all") {
    list = taskList;
  } else {
    list = filteredList;
  }

  if (list.length == 0) {
    resultHtml += "";
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isCompleted) {
      resultHtml += `<li class="task-card done">
                    <h2 class="task-done">${list[i].taskName}</h2>
                    <div class="btn-group">
                    <button class="done-btn" onclick="toggleCompleted('${list[i].id}')">✅</button>
                    <button class="delete-btn" onclick="deleteTask('${list[i].id}')">🗑</button>
                    </div>
                  </li>`;
    } else {
      resultHtml += `<li class="task-card">
                    <h2>${list[i].taskName}</h2>
                    <div class="btn-group">
                    <button class="done-btn" onclick="toggleCompleted('${list[i].id}')">✅</button>
                    <button class="delete-btn" onclick="deleteTask('${list[i].id}')">🗑</button>
                    </div>
                  </li>`;
    }
  }
  taskBoard.innerHTML = resultHtml;
}

function toggleCompleted(id) {
  list.forEach((li) => {
    if (li.id == id) {
      li.isCompleted = !li.isCompleted;
    }
  });
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
  }
  filteredList = [];
  if (mode == "todo") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isCompleted == false) {
        filteredList.push(taskList[i]);
      }
    }
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isCompleted) {
        filteredList.push(taskList[i]);
      }
    }
  }
  renderList();
}

function handleTabClick(event) {
  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (let i = 0; i < menuTab.length; i++) {
      menuTab[i].classList.remove("clicked");
    }
    event.target.classList.add("clicked");
  }
}

function init() {
  for (let i = 0; i < menuTab.length; i++) {
    menuTab[i].addEventListener("click", handleTabClick);
  }
}

init();
