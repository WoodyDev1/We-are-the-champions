// Importing functions from Firebase database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Personal DatabseURL 
const appSettings = {
    databaseURL: "https://we-are-the-champions-d3dd8-default-rtdb.europe-west1.firebasedatabase.app/"
}

// Not too sure what this is doing?
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementsList")

// Getting elements from HTML
const publishBtnEl = document.getElementById("publish-btn")
const inputEl = document.getElementById("msg-input")
const endorsementsEl = document.getElementById("endorsements")

// Publish button
publishBtnEl.addEventListener("click", function(){
    // Getting input field value
    let inputValue = inputEl.value

    //Pushing input field value to database
    push(endorsementsListInDB, inputValue)

    // Clearing input field for next input
    clearInputFieldEl()
})

// Not too sure what all of this does? 
onValue(endorsementsListInDB, function(snapshot){
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearListEl()

        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendToList(currentItem)
        }
    } else {
        endorsementsEl.textContent = "Nothing to show..."
    }
}
)

// Clears items from list
function clearListEl() {
    endorsementsEl.innerHTML = ""
}

// Clears input field
function clearInputFieldEl() {
    inputEl.value = ""
}

// Creating new element from database item value. Not too sure how though? 
function appendToList(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `endorsementsList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    endorsementsEl.append(newEl)
}
