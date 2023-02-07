// načtení dat z localStorage do proměnné toDolist; pokud je localStorage prázdný, tak do toDoList se uloží prázdné pole
const toDoList = getSavedToDos()

// odeslání formuláře a uložení do localStorage pomocí proměnné toDoList
let toDoForm = document.querySelector("#to-do-form")

toDoForm.addEventListener("submit", (event) => {
    event.preventDefault()

    toDoList.push({
        id: uuidv4(),
        todo: event.target.elements.todo.value
    })

    event.target.elements.todo.value = ""

    saveToDos(toDoList)
})

// vypisování zpět do stránky
let buttonToList = document.querySelector(".to-list")

buttonToList.addEventListener("click", (event) => {
    document.querySelector(".todo-list").innerHTML = ""

    let todoFromStorage = localStorage.getItem("todo")
    let todoFromStorageJSON = JSON.parse(todoFromStorage)

    todoFromStorageJSON.forEach((oneToDo) => {
        const oneToDoHTML = generateHTMLstructure(oneToDo)
        document.querySelector(".todo-list").appendChild(oneToDoHTML)
    })
})

// refreshování stránky
window.addEventListener("storage",(event) => {
    location.reload()
})
