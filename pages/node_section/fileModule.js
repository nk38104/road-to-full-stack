const fs = require("fs");

// READ
fs.readFile("./test.txt", (err, data) => {
    if(err) {
        console.log(error);
    }
    console.log("Async: ", data.toString()); 
});

const file = fs.readFileSync("./test.txt");
console.log("Sync: ", file.toString());

// APPEND
fs.appendFile("./test.txt", " Added text.", err => {
    if(err) {
        console.log(err);
    }
});

// WRITE
fs.writeFile("greeting.txt", "Hello, User! Welcome to my file.", err => {
    if(err) {
        console.log(err);
    }
});

// DELETE
fs.unlink("./greeting.txt", err => {
    if (err) {
        console.log(err);
    }
})
