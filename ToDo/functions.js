/*
Funkce načítající data z localStorage;
Ošetřit, pokud data v localStorage nejsou
*/
const getSavedToDos = () => {
    const toDo = localStorage.getItem("todo")
    if(toDo !== null){
        return JSON.parse(toDo)
    } else {
        return []
    }
}

/*
Funkce pro použití při odeslání formuláře;
Ukládá do localStorage úkol z formuláře
*/
const saveToDos = (oneToDo) => {
    localStorage.setItem("todo", JSON.stringify(oneToDo))
}

/*
Generování HTML struktury, kterou umístíme do stránky po kliknutí na tlačítko "Vypiš"
+ použijeme ji také pro vypsání nových informací z localStorage, když nějaký úkol vymažeme pomocí tlačítka "Smazat"
*/
const generateHTMLstructure = (oneToDo) => {
    const newDiv = document.createElement("div")
    newDiv.className = "list-item"
    const innerDiv = document.createElement("div")
    innerDiv.className = "item-buttons"
    const toDo = document.createElement("span")
    const deleteButton = document.createElement("button")
    const editButton = document.createElement("a")

    toDo.textContent = oneToDo.todo
    newDiv.append(toDo)

    newDiv.appendChild(innerDiv)

    // nastavení mazacího tlačítka
    deleteButton.textContent = "Smazat"
    innerDiv.appendChild(deleteButton)

    deleteButton.addEventListener("click", (event) => {
        removeToDo(toDoList, oneToDo.id)
        saveToDos(toDoList)
        toListAgain()
    })

    // nastavení editButton
    editButton.textContent = "Upravit"
    editButton. setAttribute("href", `./edit.html#${oneToDo.id}`)
    innerDiv.appendChild(editButton)

    return newDiv
}

/*
Podle ID najdeme index daného úkolu a pomocí splice ho odstraníme
*/
const removeToDo = (ourToDo, id) => {
    const index = ourToDo.findIndex((wantToCheck) => {
        return wantToCheck.id === id
    })

    if(index > -1){
        ourToDo.splice(index, 1)
    }
}

/*
Pokud smažeme nějaký úkol z localStorage, tak tato
funkce zabezpečí opětovné vypsání localStorage (vypsání bez smazaného úkolu)
*/
const toListAgain = () => {
    document.querySelector(".todo-list").innerHTML  = ""

    let newData = getSavedToDos()

    newData.forEach((onlyOneToDo) => {
        const newContent = generateHTMLstructure(onlyOneToDo)
        document.querySelector(".todo-list").appendChild(newContent)
    })
}
