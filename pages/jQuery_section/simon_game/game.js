
const simonGame = {
    buttonColors: ["green", "red", "blue", "yellow"],
    gameButtons: $("[type='button']"),
    currentLevel: 1,
    colorSequence: [],
    userColorSequence: [],
    userGuessCount: 0,
    hasStarted: false,
    play: function() {
        this.hasStarted = true;
        
        // Disable clicks so that user can't interrupt color sequence display and miss color flash
        this.gameButtons.off("click");

        this.nextSequence();
        
        // Enable click event to color buttons because it's users turn to repeat the sequence
        setTimeout(() => addPressedAnimationEvent(this.gameButtons), (this.colorSequence.length * 500) + 2000);
    },
    nextSequence: function() {
        let $this = this;
        this.userColorSequence = [];
        this.userGuessCount = 0;
        
        changeHeaderText(`Level ${this.currentLevel}`);

        setTimeout(function() {
            $this.colorSequence.push(generateNextColor(this.buttonColors));
            $this.displayColorSequence();
        }, 1000);
    },
    displayColorSequence: function() {
        this.colorSequence.forEach((color, index) => {
            flashColorAnimation(color, index);
        });
    },
    checkUserSequence: function() {
        if(this.colorSequence[this.userGuessCount] === this.userColorSequence[this.userGuessCount]) {
            ++(this.userGuessCount);
            
            if(this.colorSequence.length === this.userColorSequence.length) {
                ++(this.currentLevel);
                this.play();
            }
        } else {
            this.lost();
        }
    },
    lost: function() {
        playSound("wrong.mp3");
        let body = $("body");
        
        body.addClass("game-over");
        changeHeaderText("Game Over, Press Any Key to Restart");
        removeClassWithDelay(body, "game-over", 200);
        
        this.reset();
        this.gameButtons.off("click");
    },
    reset: function() {
        this.currentLevel = 1,
        this.colorSequence = [],
        this.userColorSequence = [],
        this.userGuessCount = 0,
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


function playSound(soundFileName) {
    new Audio(`sounds/${soundFileName}`).play();
}


function addPressedAnimationEvent(element) {
    element.click(function() {
        let $this = $(this);
        simonGame.userColorSequence.push($this.attr("id"));
    
        playSound(`${$this.attr("id")}.mp3`);
        $this.addClass("pressed");
        removeClassWithDelay($this, "pressed", 100);

        simonGame.checkUserSequence();
    });
}


$(document).keypress(() => {
    if(!simonGame.hasStarted) {
        simonGame.play();
    }
});
