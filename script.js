// create버튼을 onsubmit 누르면 일을 추가할 수 있다.

// all 누르면 전체 일
// to do 누르면 done 안된일들만 보임
// done 누르면 완료한 일들 텍스트에 가로줄

// task박스안에 초록체크 누르면 done으로 이동
// task박스안 삭제누르면 삭제

// done 안에서 리버트 누르면 다시 all로 복귀

const createBtn = document.querySelector(".add-task-btn");
const taskForm = document.querySelector(".add-task-form input");
const taskBoard = document.querySelector(".task-cards-board");
const deleteBtn = document.getElementsByClassName("delete-btn");
const doneBtn = document.getElementsByClassName("done-btn");
const taskList = [];
createBtn.addEventListener("click", addTask);

doneBtn.forEach((done) => {
  done.addEventListener("click", taskDone);
});

function addTask(e) {
  e.preventDefault();
  console.log("add task");
  const taskName = taskForm.value;
  taskList.push(taskName);
  taskForm.value = "";
  console.log(taskList);
  renderList();
}

function renderList() {
  let resultHtml = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHtml += `<li class="task-card">
                    <h2>${taskList[i]}</h2>
                    <div class="btn-group">
                      <button class="delete-btn">🗑</button>
                      <button class="done-btn">✅</button>
                    </div>
                  </li>`;
    taskBoard.innerHTML = resultHtml;
  }
}

function taskDone() {
  console.log("done!!!");
}
