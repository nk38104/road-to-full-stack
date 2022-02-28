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
 
 const initialGameObj = {
    buttonColors: ["green", "red", "blue", "yellow"],
    currentLevel: 1,
    colorSequence: [],
    isGameOver: false,
    generateNextColor: function() {
        let randomColorIndex = Math.floor(Math.random() * 3);
        this.colorSequence.push(this.buttonColors[randomColorIndex]);
    },
    flashColorSequence: function() {
        this.colorSequence.forEach((color, index) => {
            flashAnimation(color, index);
        });
    }
}

function flashAnimation(color, index) {
    let colorButton = $(`#${color}`);
    let delay = index * 500;

    setTimeout(function() {
        colorButton.addClass("hide");
    }, delay);

    setTimeout(function() {
        colorButton.removeClass("hide");
    }, delay + 100);
}

$("[type='button']").click(function() {
    let $this = $(this);

    $this.addClass("pressed");
    new Audio(`sounds/${$this.attr("id")}.mp3`).play();
    
    setTimeout(function() {
        $this.removeClass("pressed");
    }, 100);
});

$(document).ready().keypress(function() {
    let currentGameObj = { ...initialGameObj };

    $("h1").text(`Level ${currentGameObj.currentLevel}`);
    
    currentGameObj.generateNextColor();
    currentGameObj.flashColorSequence();
});
