var button = document.getElementById("btn-add");
var userInput = document.getElementById("task-input");
var ul = document.querySelector("#task-list");

function checkInputLength() {
    return userInput.value.length;
}


function addListItemChildren(li) {
    var  checkbox = document.createElement("input");
    var button = document.createElement("button");
    var image = document.createElement("img");
}

function createListElement() {
    var li = document.createElement("li");
    var  checkbox = document.createElement("input");
    var button = document.createElement("button");
    var image = document.createElement("img");
    
    addListItemChildren(li);
    
    li.setAttribute("class", "task-item");

    checkbox.setAttribute("type", "checkbox");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn-delete");
    image.setAttribute("src", "./images/delete-icon.ico");
    
    button.appendChild(image);

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(userInput.value));
    li.appendChild(button);

    ul.appendChild(li);

    userInput.value = "";
}

function addTaskAfterClick(event) {
    if(checkInputLength() > 0) {
        createListElement();
    }
}

function addTaskAfterKeyPress(event) {
    if(checkInputLength() && event.keyCode === 13) {
        createListElement();
    }
}

button.addEventListener("click", addTaskAfterClick);
userInput.addEventListener("keypress", addTaskAfterKeyPress);