const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const pickCountInput = document.getElementById("pick-count");
const pickButton = document.getElementById("pick-button");
const pickedList = document.getElementById("picked-list");
const message = document.getElementById("message");

const todos = [];

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((task, index) => {
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = task;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "削除";
    removeButton.className = "delete-btn";
    removeButton.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
      pickedList.innerHTML = "";
      message.textContent = "タスクが変更されたため、抽選結果をリセットしました。";
    });

    li.append(text, removeButton);
    todoList.appendChild(li);
  });
}

function pickRandomTasks() {
  pickedList.innerHTML = "";

  if (todos.length === 0) {
    message.textContent = "まずタスクを追加してください。";
    return;
  }

  const requestedCount = Number.parseInt(pickCountInput.value, 10);

  if (!Number.isInteger(requestedCount) || requestedCount < 1) {
    message.textContent = "取り出す個数は1以上の整数を入力してください。";
    return;
  }

  const count = Math.min(requestedCount, todos.length);

  if (requestedCount > todos.length) {
    message.textContent = `タスク数を超えたため、${todos.length}件を選びました。`;
  } else {
    message.textContent = `${count}件のタスクをランダムに選びました。`;
  }

  const shuffled = [...todos]
    .map((task) => ({ task, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.task);

  shuffled.slice(0, count).forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;
    pickedList.appendChild(li);
  });
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = todoInput.value.trim();

  if (!value) {
    return;
  }

  todos.push(value);
  todoInput.value = "";
  renderTodos();
});

pickButton.addEventListener("click", pickRandomTasks);
