var css = document.querySelector("h3");
var color_one = document.getElementById("color_one");
var color_two = document.getElementById("color_two");
var body = document.body;

function setGradient() {
    body.style.background = "linear-gradient(to right, " +
                            color_one.value + ", " +
                            color_two.value + ")";

    css.textContent = body.style.background + ";";
}

color_one.addEventListener("input", setGradient);
color_two.addEventListener("input", setGradient);