//-------------------------------------------------------------------------------------------------------------------------------
// QUESTION 1: 
// Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20],
// make a function that organizes these into individual array that is ordered. 
// For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20],391,392,591].
// Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]];
//-------------------------------------------------------------------------------------------------------------------------------

function question1_v2(array) {
    let sortedArray = [...array.sort((a, b) => a - b)];
    let organizedArray = sortedArray.reduce((acc, number) => {

        if(!acc.flat(Infinity).includes(number)) {

            let filteredArray = sortedArray.filter(num => num === number);
            
            if(filteredArray.length > 1) {
                acc.push(filteredArray);
            } else {
                acc = acc.concat(filteredArray);
            }
        }
        return acc;
    }, []);

    return organizedArray;
}

function question1(array) {
    let sortedArray = [...array.sort((a, b) => a - b)];
    let organizedArray = [];

    while(sortedArray.length > 0) {
        let splicedArray = sortedArray.splice(0, sortedArray.lastIndexOf(sortedArray[0]) + 1);

        if(splicedArray.length > 1) {
            organizedArray.push(splicedArray);
            continue;
        }
        organizedArray = organizedArray.concat(splicedArray);
    }
    
    return organizedArray;
}

const array = [ 1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, [1, 1], 20, 20, "1", "1"];
console.log("QUESTION 1");
console.log("Version 1:", question1(array.flat(Infinity)));
console.log("Version 2:", question1_v2(array.flat(Infinity)));


//---------------------------------------------------------------------------------------------------------------
// QUESTION 2:
// Write a javascript function that takes an array of numbers and a target number.
// The function should find two different numbers in the array that, when added together, give the target number.
// For example: answer([1,2,3], 4)should return [1,3]
//---------------------------------------------------------------------------------------------------------------

function question2_v2(numbers, target) {
    for(const [index, num] of numbers.entries()) {
        if (numbers.includes(difference = target - num, index + 1)) {
            return [num, difference];
        }
    }
    return `There are no number pairs that get ${sum}.`;
}

function question2(numbers, target) {
    const arrSize = numbers.length;

    for(let i = 0; i < arrSize; ++i) {
        if(numbers.includes(difference = target - numbers[i], i + 1)) {
            return [numbers[i], difference];
        }
    }
    
    return `There are no number pairs that get ${target}.`;
}

const array2 = [[ 1, 2, 3, -1, 10, -56, -3 ], 0];
console.log("\nQUESTION 2");
console.log("Version 1:", question2(array2[0], array2[1]));
console.log("Version 2:", question2_v2(array2[0], array2[1]));


// ----------------------------------------------------------------------------------------------------------------------------------------------------
// QUESTION 3:
// Write a function that converts HEX to RGB.
// Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.
// ----------------------------------------------------------------------------------------------------------------------------------------------------

const checkIfNumber = num => typeof num === "number";
const checkRGBValues = num => num < 256 && num > 0;

let hexColor = "#428ef5";                 // hex format - # + 3 or 6 digit string
const rgbColor = convertToRGB(hexColor);    // rgb format - 3 numbers from 0 to 255 representing red, green, blue


// HEX --> RGB
function convertToRGB(hexColor) {

    if (hexColor.length != 7 && hexColor.length != 4) {
        return null;
    }
    
    let rgbColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);

    return rgbColor ? [parseInt(rgbColor[1], 16), parseInt(rgbColor[2], 16), parseInt(rgbColor[3], 16)] : null;
}


// RGB --> HEX
function componentToHex(component) {
    let hexComponent = component.toString(16);
    return (hexComponent.length === 1) ? "0" + hexComponent : hexComponent;
}

// This function can be called successfully in 2 ways
// 1. convertToHex(number, number, number); ---> Function accepts 3 number parameters representing red, green and blue values (0 - 255)
// 1. convertToHex(array);                  ---> Function accpets array consisting of 3 numbers representing red, green, blue values (0 - 255)
function convertToHex(red, green, blue) {

    if(arguments.length != 3 && arguments.length != 1) {
        return "Invalid arguments.";
    }

    if(arguments.length === 1){
        if(arguments[0].length != 3 || !Array.isArray(arguments[0])) {
            return "Invalid arguments.";
        }
    }

    let args = (arguments.length === 3) ? [...arguments] : arguments[0];

    return (args.every(checkIfNumber || checkRGBValues)) ? `#${componentToHex(args[0])}${componentToHex(args[1])}${componentToHex(args[2])}` : "Invalid arguments.";
}

console.log("\nQUESTION 3");
console.log(`Hex ${hexColor} ==> rgb(${rgbColor})`);


if((hexColor = rgbColor)) {
    hexColor = convertToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
    // hexColor = convertToHex(rgbColor);
}

console.log(`rgb(${rgbColor}) ==> ${hexColor}`);