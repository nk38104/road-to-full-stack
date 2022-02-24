let drumButtons = document.querySelectorAll("button.drum");


function handleClick(event) {
    console.log("Clicked");
}


drumButtons.forEach(btn => btn.addEventListener("click", handleClick));