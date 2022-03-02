/* ------------------------------------------------------------------------------------------
    LOOP:
        1. Wait for keypress for game to start
        2. When click is registered start the game:
            2.1 Change h1 to current level
            2.2 Generate next color (random number from 0 to 3)
            2.3 Add that color to color sequence
            2.4 Flash color sequence for user on screen
            * --- Disable any click registration while previous steps are happening ---- *
        3. When previous steps are done it's users turn to play:
            3.1 Wait for user click or keypress(bind wasd keys to colors):
                3.1.1 Make button pressed effect
                3.1.2 Make button sound
            3.2 Check if game over state is false (while loop)
            3.3 Check if pressed button is in right sequence:
                3.3.1 If not:
                    3.3.1.1 Turn background to red
                    3.3.1.2 Play game over sound
                    3.3.1.3 Inform player that it's game over
                    3.3.1.4 Reset the game to init state and go back to step 1
                3.3.2 If correct:
                    3.3.2. Go to step 3.1
 ------------------------------------------------------------------------------------------*/

 const simonGame = {
    buttonColors: ["green", "red", "blue", "yellow"],
    currentLevel: 1,
    colorSequence: [],
    userColorSequence: [],
    hasStarted: false,
    isOver: false,
    play: function() {
        this.hasStarted = true;
        
        // Disable clicks while color sequence is displaying so user can't interrupt it and miss color flash
        let colorButtons = $("[type='button']");
        colorButtons.off("click");
        
        changeHeaderText(`Level ${this.currentLevel}`);
        
        setTimeout(() => this.nextSequence(), 1000);
        
        // Re-enable click event to color buttons because it's users turn to repeat the sequence
        setTimeout(() => pressedAnimation(colorButtons), (this.colorSequence.length * 500) + 2000);

        ++(simonGame.currentLevel);
    },
    nextSequence: function() {
        this.colorSequence.push(generateNextColor(this.buttonColors));
        this.displayColorSequence();
    },
    displayColorSequence: function() {
        this.colorSequence.forEach((color, index) => {
            flashColorAnimation(color, index);
        });
    },
    reset: function() {
        this.currentLevel = 1,
        this.colorSequence = [],
        this.userColorSequence = [],
        this.hasStarted = false,
        this.isOver = false
    }
}

function changeHeaderText(headerText) {
    $("h1").text(headerText);
}

function generateNextColor() {
    const randomColorIndex = Math.floor(Math.random() * 3);
    return simonGame.buttonColors[randomColorIndex];
}

function flashColorAnimation(color, index) {
    let colorButton = $(`#${color}`), animationDelay = index * 500;
    
    addClassWithDelay(colorButton, "hide", animationDelay);
    removeClassWithDelay(colorButton, "hide", animationDelay + 100);
}

function addClassWithDelay(element, className, delay) {
    setTimeout(() => element.addClass(className), delay);
}

function removeClassWithDelay(element, className, delay) {
    setTimeout(() => element.removeClass(className), delay);
}

function pressedAnimation(element) {
    element.click(function() {
        let $this = $(this);
    
        addClassWithDelay($this, "pressed", 0);
        playSound(`${$this.attr("id")}.mp3`);
        removeClassWithDelay($this, "pressed", 100);
    });
}

function playSound(soundFileName) {
    new Audio(`sounds/${soundFileName}`).play();
}

$(document).keypress(() => {    
    simonGame.play();
});
