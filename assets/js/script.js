//? Get the elements
//? create add func
const input = document.querySelector(".input")
const addBtn = document.querySelector(".add")
const tasksContainer = document.querySelector(".tasks")

// arr to store tasks
let tasksArr = getTasks()
addBtn.addEventListener("click", () => {
    if (input.value !== "") {
        let TaskValue = input.value
        addTask(TaskValue)
        input.value = ""
    }
})

// add task func
function addTask(task) {
    const taskData = {
        id: Date.now(),
        text: task,
        completed: false
    }
    tasksArr.push(taskData)
    addTaskElement(tasksArr)
    storeTasks()
}

// add task element
function addTaskElement(Array) {
    tasksContainer.innerHTML = ""
    Array.forEach((task) => {
        createTaskElement(task)
    })

}

// create task element
function createTaskElement(task) {
    // create task element
    const taskElement = document.createElement("div")
    taskElement.className = "task"
    taskElement.setAttribute("data-id", task.id)
    taskElement.appendChild(document.createTextNode(task.text))
    // create delete button
    const spanContainer = document.createElement("div")
    spanContainer.className = "span-container"
    const deleSpan = document.createElement("span")
    deleSpan.className = "delete"
    deleSpan.appendChild(document.createTextNode("delete"))
    //create a done button
    const doneSpan = document.createElement("span")
    doneSpan.className = "done"
    let doneIcon = document.createElement("i")
    doneIcon.className = "fa-solid fa-check"
    doneSpan.appendChild(doneIcon)
    // create edit button
    const editSpan = document.createElement("span")
    editSpan.className = "edit"
    let editIcon = document.createElement("i")
    editIcon.className = "fa-solid fa-pen-to-square"
    editSpan.appendChild(editIcon)
    // append children
    spanContainer.appendChild(doneSpan)
    spanContainer.appendChild(editSpan)
    spanContainer.appendChild(deleSpan)
    taskElement.appendChild(spanContainer)
    tasksContainer.appendChild(taskElement)
}

// store tasks in local storage
function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasksArr))
}

// get tasks from local storage
function getTasks() {
    let tasks = localStorage.getItem("tasks")
    if (tasks) {
        addTaskElement(JSON.parse(tasks))
        return JSON.parse(tasks)
    } else
        return []
}

// delete
// 1 - remove from page
// 2 - remove from local storage
// 3 - update a task array
// get the task id
let delButtons = document.querySelectorAll(".delete")
if (delButtons){
    delButtons.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", (e) => {
            // get the task id
            let taskId = e.target.parentElement.parentElement.getAttribute("data-id")
            deleteTask(taskId)
        })
    })
}
function deleteTask(taskId)
{
    // remove from page
    let taskEle = document.querySelector(`[data-id="${taskId}"]`)
    taskEle.remove()
    // remove from the task array
    tasksArr = tasksArr.filter((task)=> task.id != taskId)
    storeTasks()
}
