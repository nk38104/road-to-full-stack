let drumButtons = document.querySelectorAll("button.drum");


function playDrumSound(key) {
    switch(key) {
        case "w":
            new Audio("sounds/tom-1.mp3").play();
            break;
        case "a":
            new Audio("sounds/tom-2.mp3").play();
            break;
        case "s":
            new Audio("sounds/tom-3.mp3").play();
            break;
        case "d":
            new Audio("sounds/tom-4.mp3").play();
            break;
        case "j":
            new Audio("sounds/snare.mp3").play();
            break;
        case "k":
            new Audio("sounds/crash.mp3").play();
            break;
        case "l":
            new Audio("sounds/kick-bass.mp3").play();
            break;
        default:
            console.log(`Pressed key($${key}) not bound to any sound.`);
    }
}


drumButtons.forEach(btn => btn.addEventListener("click", (event) => playDrumSound(event.target.textContent)));
document.addEventListener("keydown", (event) => playDrumSound(event.key));
