// ---------------------------
// -------- DATABASE  --------
// ---------------------------

var database = [
    {
        username: "admin",
        password: "admin",
    },
];

// ---------------------------
// -------- NEWSFEED  --------
// ---------------------------

var newsFeed = [
    {
        username: "nikola94",
        timeline: "So exicted to learn new things! :)",
    },
    {
        username: "JohnDoe",
        timeline: "JavaScript is cool.",
    },
];

// -----------------------
// -------- MAIN  --------
// -----------------------

function signIn(user) {
    if (user.username === database[0].username &&
        user.password === database[0].password) {
            alert("Willkommen!\nYou can now check console(F12 -> Console) for news feed.");
            console.log(newsFeed);
        }
    else {
        alert("Sorry, wrong username or password. Try again.");
    }
}

var userPromptObject = function () {
    var usernamePrompt = prompt("Enter your username(admin): ");
    var passwordPrompt = prompt("Enter your password(admin): ");

    return  {
        username: usernamePrompt, 
        password: passwordPrompt
    };
};

signIn(userPromptObject());