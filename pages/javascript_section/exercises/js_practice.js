// Question 1: 
// Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20],
// make a function that organizes these into individual array that is ordered. 
// For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20],391,392,591].
// Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]];

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


// Question 2:
// Write a javascript function that takes an array of numbers and a target number.
// The function should find two different numbers in the array that, when added together, give the target number.
// For example: answer([1,2,3], 4)should return [1,3]

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
console.log("Version 2:", question2(array2[0], array2[1]));

// Question 3:
// Write a function that converts HEX to RGB.
// Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.