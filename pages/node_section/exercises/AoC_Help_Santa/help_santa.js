// task url: https://adventofcode.com/2015/day/1
const fs = require("fs");


function GetPath() {
    const path = fs.readFileSync(`${__dirname}\\path.txt`, err => {
        if(err) {
            console.log(error);
        }
    });

    return path.toString();
}

const path = GetPath();
let goUpCounter = goDownCounter = 0;

for (const direction of path) {
    if(direction === '(') {
        ++goUpCounter;
        continue;
    }
    if(direction === ')') {
        ++goDownCounter;
    }
};

console.log(`Santa has to go on floor n.${goUpCounter - goDownCounter}!`);
