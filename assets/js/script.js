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
    let deleteIcon = document.createElement("i")
    deleSpan.className = "delete"
    deleteIcon.className = "fa-solid fa-trash-can"
    deleSpan.appendChild(deleteIcon)
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