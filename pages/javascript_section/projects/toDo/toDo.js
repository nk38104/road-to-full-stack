var button = document.getElementById("btn-save");
var userInput = document.getElementById("user-input");
var ul = document.querySelector("#tasks");

function checkInputLength() {
    return userInput.value.length;
}

function createListElement() {
    var li = document.createElement("li");
        li.appendChild(document.createTextNode(userInput.value));
        ul.appendChild(li);
        userInput.value = "";
}

function saveTaskAfterClick(event) {
    if(checkInputLength() > 0) {
        createListElement();
    }
}

function saveTaskAfterKeyPress(event) {
    if(checkInputLength() && event.keyCode === 13) {
        createListElement();
    }
}

button.addEventListener("click", saveTaskAfterClick);
userInput.addEventListener("keypress", saveTaskAfterKeyPress);