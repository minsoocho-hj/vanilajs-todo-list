// create버튼을 onsubmit 누르면 일을 추가할 수 있다.

// all 누르면 전체 일
// to do 누르면 done 안된일들만 보임
// done 누르면 완료한 일들 텍스트에 가로줄
// >>객체를 만들어서 isCompleted 값을 false로 디폴트로 다 주고,
// done 누르면 true로 업데이트 된다.
// isCompleted = true면, 가로줄 생기고 그리고 done 페이지에서 볼 수있다.

// task박스안에 초록체크 누르면 done으로 이동
// task박스안 삭제누르면 삭제

// done 안에서 리버트 누르면 다시 all로 복귀

const createBtn = document.querySelector(".add-task-btn");
const taskForm = document.querySelector(".add-task-form input");
const taskBoard = document.querySelector(".task-cards-board");
const deleteBtn = document.querySelectorAll(".delete-btn");
const doneBtn = document.querySelectorAll(".done-btn");
const tabs = document.querySelectorAll(".status-category li");
let mode = "all";
let taskList = [];
let filteredList = [];
let list = [];
createBtn.addEventListener("click", addTask);
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", filter);
}

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
  list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "todo" || mode == "done") {
    list = filteredList;
  }
  let resultHtml = "";
  if (list.length == 0) {
    resultHtml += "";
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].isCompleted == true) {
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
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      list[i].isCompleted = !list[i].isCompleted;
      break;
    }
  }
  renderList();
}

function deleteTask(id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      list.splice(i, 1);
    }
  }
  renderList();
}

function filter(e) {
  mode = e.target.id;
  filteredList = [];
  if (mode == "all") {
    renderList();
  } else if (mode == "todo") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isCompleted == false) {
        filteredList.push(taskList[i]);
      }
    }
    renderList();
  } else {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isCompleted) {
        filteredList.push(taskList[i]);
      }
    }
    renderList();
  }
}
