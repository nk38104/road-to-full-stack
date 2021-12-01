// ---------------------------
// -------- DATABASE  --------
// ---------------------------

var database = [
    {
        username: "admin",
        password: "admin",
    },
    {
        username: "test",
        password: "test",
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
    {
        username: "admin",
        timeline: "New updates coming soon!!!",
    },
];

// -----------------------
// -------- MAIN  --------
// -----------------------

function isUserValid(userInput) {
    for(const user in database) {
        if (database[user].username === userInput.username && 
            database[user].password === userInput.password) {
                return true;
        }
    }
    return false;
}

function signIn(userInput) {
    if(isUserValid(userInput)) {
        alert("Willkommen!\nYou can now check console for news feed(F12 -> Console).");
        newsFeed.forEach(post => console.log(`${post.username}:\n\t${post.timeline}`));
    }
    else {
        alert("Sorry, wrong username or password. Try again.");
    }
}

var userPromptObject = function () {
    var usernamePrompt = prompt("Enter your username(admin or test): ");
    var passwordPrompt = prompt("Enter your password(admin or test): ");

    return  {
        username: usernamePrompt, 
        password: passwordPrompt
    };
};

signIn(userPromptObject());