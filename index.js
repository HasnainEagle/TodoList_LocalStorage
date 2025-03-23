// input tag
let inputElement = document.querySelector(".input_tag");
// addtask-btn element
let addtaskElement = document.querySelector(".add_task");
// TodoListElement
let todoListElement = document.querySelector(".todoList");

let editIndex = -1;
let todoList = [];

let isLocalStorageDataPresent = localStorage.getItem("todoList");
console.log(isLocalStorageDataPresent);

// saveTask Function
// const saveTask = () => {
//   let taskName = inputElement.value;

//   // check taskName is empty or not
//   if (taskName.trim() === "") return;

//   if (editIndex !== -1) {
//     // todoList.splice(editIndex, 1);
//     todoList[editIndex].taskName = taskName;
//     editIndex = -1; //reset editIndex
//   }

//   let taskId = todoList.length + 1;

//   const todoObj = {
//     taskId: taskId,
//     taskName: taskName,
//   };
//   todoList.push(todoObj);
//   console.log(todoList);
//   displayTodo();
//   inputElement.value = "";
// };

const saveTask = () => {
  let taskName = inputElement.value;
  // console.log("taskName", taskName);

  // check taskName is empty or not
  if (taskName.trim() === "") return;

  if (editIndex !== -1) {
    // Update the existing task instead of deleting it
    todoList[editIndex].taskName = taskName;
    localStorage.setItem("todoList", JSON.stringify(todoList));
    editIndex = -1; // Reset editIndex
  } else {
    // Create a new task if not in edit mode
    let taskId = todoList.length + 1;

    const todoObj = {
      taskId: taskId,
      taskName: taskName,
    };

    todoList.push(todoObj);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  displayTodo();
  inputElement.value = "";
};

// displayTask Function
const displayTodo = () => {
  todoListElement.innerHTML = "";

  for (let index = 0; index < todoList.length; index++) {
    // create div
    let todo_div = document.createElement("div");
    // give class to tododiv
    todo_div.classList.add("todo");

    //   Label Start

    // create label
    let todo_name = document.createElement("label");
    // give text to todo_name
    todo_name.textContent = todoList[index].taskName;
    //  append todo_name in todo_div
    todo_div.appendChild(todo_name);
    // append todo_div in todolist div
    todoListElement.appendChild(todo_div);

    //   Label End

    //   Button Start

    //   create another div for
    let mybtn_div = document.createElement("div");
    //   give class to mybtn_div
    mybtn_div.classList.add("btn_div");
    //   create Edit Button
    let editBtn = document.createElement("button");
    //   give class to editBtn
    editBtn.classList.add("edit_btn");
    //   give text to editBtn
    editBtn.textContent = "Edit";

    // add EventListener to an editBtn
    editBtn.addEventListener("click", editTodo);
    // editBtn.taskId = todoList[index].taskId;
    editBtn.setAttribute("data-taskid", todoList[index].taskId);

    //   create delete Button
    let deleteBtn = document.createElement("button");
    //   give class to deleteBtn
    deleteBtn.classList.add("delete_btn");
    //   give text to deleteBtn
    deleteBtn.textContent = "Delete";

    //   add EventListener to deleteBtn
    deleteBtn.addEventListener("click", deleteTodo);
    // deleteBtn.taskId = todoList[index].taskId;
    deleteBtn.setAttribute("data-taskid", todoList[index].taskId);

    //   append editBtn in mybtn_div
    mybtn_div.appendChild(editBtn);
    //   append deleteBtn in mybtn_div
    mybtn_div.appendChild(deleteBtn);

    // append mybtn_div in todo_div
    todo_div.appendChild(mybtn_div);

    //   Button End
  }
};

// editTodo Function
const editTodo = (e) => {
  let taskId = Number(e.target.getAttribute("data-taskid"));

  editIndex = todoList.findIndex((m) => m.taskId === taskId);
  console.log(editIndex);
  // editTask = todoList.find((m) => m.taskId === taskId);
  // console.log(editTask);

  if (editIndex !== -1) {
    inputElement.value = todoList[editIndex].taskName;
  }
};

// deleteTodo Function
const deleteTodo = (e) => {
  let taskId = Number(e.target.getAttribute("data-taskid"));

  let index = todoList.findIndex((m) => m.taskId === taskId);

  if (index !== -1) {
    // Check if index is valid before deleting
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayTodo();
  }
};

if (isLocalStorageDataPresent !== null) {
  todoList = JSON.parse(isLocalStorageDataPresent);
  // console.log(todoList);
  displayTodo();
}

// const deleteTodo = (e) => {
//   let taskId = Number(e.target.getAttribute("data-taskid"));
//   let index = todoList.findIndex((m) => m.taskId === taskId);
//   todoList.splice(index, 1);
//   displayTodo();
// };
