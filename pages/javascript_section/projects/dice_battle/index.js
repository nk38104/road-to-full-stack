
let randomDieNumber1 = 1;
let randomDieNumber2 = 1;
let playButton = document.getElementById("play-btn");


function getRandomDieNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function setDiceImageSource() {
    let diceImageElements = document.getElementsByTagName("img");

    diceImageElements[0].setAttribute("src", `./images/dice${randomDieNumber1}.png`);
    diceImageElements[1].setAttribute("src", `./images/dice${randomDieNumber2}.png`);
}

function setWinningInfo() {
    let winInfo = (randomDieNumber1 > randomDieNumber2) ? "Player 1 wins!" : (randomDieNumber1 < randomDieNumber2) ? "Player 2 wins!" : "Draw!";
    document.getElementById("header").textContent = winInfo; 
}

function rollDice() {
    randomDieNumber1 = getRandomDieNumber();
    randomDieNumber2 = getRandomDieNumber();

    setDiceImageSource();
    setWinningInfo();
}


// Set init state
setDiceImageSource();

playButton.addEventListener("click", rollDice);
