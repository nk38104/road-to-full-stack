const fs = require("fs");

// READ
fs.readFile(`${__dirname}\\test.txt`, (err, data) => {
    if(err) {
        console.log(error);
    }
    console.log("Async: ", data.toString()); 
});

const file = fs.readFileSync(`${__dirname}\\test.txt`);
console.log("Sync: ", file.toString());

// APPEND
fs.appendFile(`${__dirname}\\test.txt`, " Added text.", err => {
    if(err) {
        console.log(err);
    }
});

// WRITE
fs.writeFile(`${__dirname}\\greeting.txt`, "Hello, User! Welcome to my file.", err => {
    if(err) {
        console.log(err);
    }
});

// DELETE
fs.unlink(`${__dirname}\\greeting.txt`, err => {
    if (err) {
        console.log(err);
    }
})
