var gradient_info = document.querySelector("h3");
var color_one = document.getElementById("color-one");
var color_two = document.getElementById("color-two");
var body = document.body;
var btn_rand = document.getElementById("rand-btn");

function getRandomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function checkIfColorIsTooDark(color) {
    var color = color.substring(1);      // strip #
    var rgb = parseInt(color, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return (luma < 40) ? true : false; // if true pick anotehr color
}

function randomizeColors() {
    do {
        color_one.value = getRandomColor();
        color_two.value = getRandomColor();
    } while(checkIfColorIsTooDark(color_one.value) || checkIfColorIsTooDark(color_two.value));
    
    setGradient();
}

function setGradient() {
    body.style.background = "linear-gradient(to right, " +
                            color_one.value + ", " +
                            color_two.value + ")";

    gradient_info.textContent = body.style.background + ";";
}

setGradient();
color_one.addEventListener("input", setGradient);
color_two.addEventListener("input", setGradient);
btn_rand.addEventListener("click", randomizeColors);