// task url: https://adventofcode.com/2015/day/1
const fs = require("fs");


function CheckIfEnteredBasement(instructionId, santa) {
    if((santa.onFloor < 0) && !santa.wentToBasement) {
        console.log(`Position on path that made Santa enter the basement is ${++instructionId}.`);
        santa.wentToBasement = true;
    }
}

function GoToFloor(direction, instructionId, santa) {
    if(direction === '(') {
        santa.onFloor += 1;
    }
    if(direction === ')') {
        santa.onFloor -= 1;
        CheckIfEnteredBasement(instructionId, santa);
    }
}

function GetInstructions() {
    const instructions = fs.readFileSync(`${__dirname}\\instructions.txt`);

    return instructions.toString();
}

function DeliverPresents() {
    try { 
        const instructions = GetInstructions();
        const instructionCount = instructions.length;
    
        const santa = {
            wentToBasement: false,
            onFloor: 0,
        }

        for (let id = 0; id < instructionCount; ++id) {
            if (!"()".includes(instructions[id])) throw new Error("Error: Invalid direction in the instructions.");

            GoToFloor(instructions[id], id, santa);
        };

        return `Instructions took Santa on floor n.${santa.onFloor}!`
    } catch (err) {
        return err.message;
    }
}


console.log(DeliverPresents());
