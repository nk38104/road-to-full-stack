// task url: https://adventofcode.com/2015/day/1
const fs = require("fs");

function DeliverPresents() {
    fs.readFile(`${__dirname}\\instructions.txt`, (err, data) => {
        const instructions = [...data.toString()];
        let wentToBasement = false;
 
        const onFloor = instructions.reduce((acc, direction, index) => {
            if(direction === '(') {
                return (++acc);
            } 
            else if( direction === ')') {
                --acc;
                if (acc < 0 && !wentToBasement) {
                    console.log(`Position on path that made Santa enter the basement is ${++index}.`);
                    wentToBasement = true;
                }
                return acc;
            }
        }, 0);
        
        console.log(`Instructions took Santa on floor n.${onFloor}!`);
    });
}

console.time("Deliver duration");
DeliverPresents();
console.timeEnd("Deliver duration");
