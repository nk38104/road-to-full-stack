

function checkInputLength() {
    return userInput.value.length;
}

function toggleTaskStatus(event) {
    var checkboxTarget = event.currentTarget;
    var parent = checkboxTarget.parentNode;

    if(checkboxTarget.checked) {
        parent.classList.add("done");
    }
    else {
        parent.classList.remove("done");
    }

    checkboxTarget.addEventListener("click", toggleTaskStatus);
}

function setTaskCheckbox(checkbox) {
    checkbox.setAttribute("type", "checkbox");
    checkbox.style.height = "18px";
    checkbox.style.width = "18px";

    checkbox.addEventListener("click", toggleTaskStatus);
}

function setTaskDeleteButton(button) {
    var image = document.createElement("img");

    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn-delete");
    button.style.width = "50px";
    button.style.height = "35px";

    image.setAttribute("src", "./images/delete-icon.ico");
    button.appendChild(image);
}

function addNewListItemChildren(li) {
    var checkbox = document.createElement("input");
    var deleteButton = document.createElement("button");

    setTaskCheckbox(checkbox);
    setTaskDeleteButton(deleteButton);

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(userInput.value));
    li.appendChild(deleteButton);
}

function createListElement() {
    var li = document.createElement("li");
    li.setAttribute("class", "task-item");
    
    addNewListItemChildren(li);
    
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

// ---------------------------------------
// ---------------- MAIN  ----------------
// ---------------------------------------

var button = document.getElementById("btn-add");
var userInput = document.getElementById("task-input");
var ul = document.querySelector("#task-list");

button.addEventListener("click", addTaskAfterClick);
userInput.addEventListener("keypress", addTaskAfterKeyPress);