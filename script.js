let form = document.getElementById("todo");
let taskInput = document.getElementById("task-input");
let addTask = document.getElementById("submit-button");
let tasksContainer = document.querySelector(".tasks-container");
let tasksArray = [];
// stop form submit prevent
form.onsubmit = function (e) {
  e.preventDefault();
};
uploadTasks(tasksArray);
addElementsToPage(tasksArray);

// UPLOAD tasks To page
function uploadTasks(tasks) {
  let data = JSON.parse(window.localStorage.getItem("tasks"));
  data.forEach((ele) => {
    tasks.push(ele);
  });
}
// add elemnts to page
function addElementsToPage(tasks) {
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => {
    // create a div container
    let div = document.createElement("div");
    let p = document.createElement("p");
    let taskTitle = document.createTextNode(`${task.title}`);
    let delButton = document.createElement("button");
    let checkBox = document.createElement("input");
    p.classList.add("task-element");
    delButton.classList.add("delete-button");
    div.appendChild(checkBox);
    checkBox.classList.add("checkbox");
    checkBox.onclick = function (e) {
      if (e.target.checked == true) {
        task.comleted = true;
        div.classList.add("done");
      } else {
        task.comleted = false;
        div.classList.remove("done");
      }
      addTasksToLocalStorage(tasksArray);
    };
    if (task.comleted == true) {
      div.classList.add("done");
      checkBox.checked = true;
    } else {
      div.classList.remove("done");
    }
    div.appendChild(p);
    div.appendChild(delButton);
    tasksContainer.appendChild(div);
    div.classList.add("new-task");
    div.setAttribute("data-id", `${task.id}`);
    p.appendChild(taskTitle);
    delButton.innerHTML = "delete";
    checkBox.setAttribute("type", "checkbox");
    delButton.addEventListener("click", function (e) {
      filtring(e.target);
      addTasksToLocalStorage(tasksArray);
    });
  });
}

// add tasks to local
function addTasksToLocalStorage(tasks) {
  window.localStorage.clear();
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

// add object to array
function addTaskToArray(taskTitle) {
  let task = {
    id: Date.now(),
    title: taskTitle,
    comleted: false,
  };
  tasksArray.push(task);
  addElementsToPage(tasksArray);
  addTasksToLocalStorage(tasksArray);
}

// check if the input not empty
addTask.onclick = function (e) {
  if (taskInput.value != "") {
    addTaskToArray(taskInput.value);
    taskInput.value = "";
    addTasksToLocalStorage(tasksArray);
  }
};

// filtring function
function filtring(eTarget) {
  tasksArray = tasksArray.filter((ele) => {
    if (ele.id == eTarget.parentElement.dataset.id) {
      eTarget.parentElement.remove();
    } else {
      return ele;
    }
  });
}
