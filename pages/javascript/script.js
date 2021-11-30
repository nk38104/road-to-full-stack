// function calculate(first, second, op) {
//     if( op === '+') 
//         return first + second;
//     else if( op === '-')
//         return first - second;
//     else if( op === '*')
//         return first * second;
//     else if( op === '/' && second !== 0)
//         return first / second;
//     else
//         return "Invalid input.\nMake sure that you input only numbers, you don't divide with 0 and used correct operation.";
// }

// function calculate(first, second, op) {
//     switch (op) {
//         case '+':
//             return first + second;
//         case '-':
//             return first - second;
//         case '*':
//             return first * second;
//         case '/':
//             if (second !== 0)
//                 return first / second;
//         default:
//             return "Invalid input.\nMake sure that you input only numbers, you don't divide with 0 and used correct operation.";
//     }
// }

var firstNumber = Number(prompt("Enter first number: "));
var secondNumber = Number(prompt("Enter second number: "));
var operation = prompt("Enter algorithmic operation (+, -, *, /): ");

// alert("Result is: " + calculate(firstNumber, secondNumber, operation));

var result = function(first, second, op) {
    if( op === '+') 
        return first + second;
    else if( op === '-')
        return first - second;
    else if( op === '*')
        return first * second;
    else if( op === '/' && second !== 0)
        return first / second;
    else
        return "Invalid input.\nMake sure that you input only numbers, you don't divide with 0 and used correct operation.";
}

alert("Result is: " + result(firstNumber, secondNumber, operation));