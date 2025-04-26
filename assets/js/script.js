//? Get the elements
//? create add func
const input = document.querySelector(".input")
const addBtn = document.querySelector(".add")
const tasks = document.querySelector(".tasks")

// arr to store tasks
let tasksArr = []
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
}