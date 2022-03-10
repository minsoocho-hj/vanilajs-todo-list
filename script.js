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
let taskList = [];
createBtn.addEventListener("click", addTask);

function addTask(e) {
  e.preventDefault();
  console.log("add task");
  let task = {
    id: Date.now(),
    taskName: taskForm.value,
    isCompleted: false,
  };
  taskList.push(task);
  taskForm.value = "";
  console.log(taskList);
  renderList();
}

function renderList() {
  let resultHtml = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isCompleted == true) {
      resultHtml += `<li class="task-card">
                    <h2 class="task-done">${taskList[i].taskName}</h2>
                    <div class="btn-group">
                    <button class="done-btn" onclick="toggleCompleted(${taskList[i].id})">✅</button>
                      <button class="delete-btn" onclick="deleteTask(${taskList[i].id})">🗑</button>
                    </div>
                  </li>`;
      taskBoard.innerHTML = resultHtml;
    } else {
      resultHtml += `<li class="task-card">
                    <h2>${taskList[i].taskName}</h2>
                    <div class="btn-group">
                    <button class="done-btn" onclick="toggleCompleted(${taskList[i].id})">✅</button>
                      <button class="delete-btn" onclick="deleteTask(${taskList[i].id})">🗑</button>
                    </div>
                  </li>`;
      taskBoard.innerHTML = resultHtml;
    }
  }
}

function toggleCompleted(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      console.log(taskList);
      taskList[i].isCompleted = !taskList[i].isCompleted;
      break;
    }
  }
  renderList();
}

function deleteTask(idd) {
  // taskList.filter((task) => task.id !== idd);
  // console.log("delete");
  // console.log(taskList);
  // renderList();
}
