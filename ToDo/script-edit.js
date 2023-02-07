// vytahujeme ID z URL adresy a hledáme objekt v localStorage
let toDoID = location.hash.substring(1)
let toDoList = getSavedToDos()

let searchedToDo = toDoList.find((oneObject) => oneObject.id === toDoID)

if(searchedToDo === undefined){
    location.assign("./index.html")
}

// todo jsme uložili do políčka
document.querySelector("#editedToDo").value = searchedToDo.todo

// změněný úkol ukládáme do localStorage
let changingForm = document.querySelector("#changing-form")
changingForm.addEventListener("submit", (event) => {
    event.preventDefault()

    searchedToDo.todo = event.target.elements.changingToDo.value

    saveToDos(toDoList)
})

// data napříč záložkami v prohlížeči (event storage, window)
window.addEventListener("storage", (event) => {   
    console.log(event)

    if(event.key === "todo"){
        toDoList = JSON.parse(event.newValue)
    }

    // vytahujeme ID z URL adresy a hledáme objekt v localStorage
    let searchedToDo = toDoList.find((oneObject) => oneObject.id === toDoID)      
    
    if(searchedToDo === undefined){
        location.assign("./index.html")
    }

    // todo jsme uložili do políčka
    document.querySelector("#editedToDo").value = searchedToDo.todo
})
