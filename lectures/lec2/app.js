const calc = require('./calculator');
const prompt = require('prompt');

function getInfo() {
    prompt.start();
    const operation = {
        name: 'operation',
        description: "Which operation do you want to do?",
        type: 'string',
        default: 'add',
        required: true,
    };

    const num1Prompt = {
        name: 'num1',
        description: "What is the first number?",
        type: 'number',
        required: true,
    };

    const num2Prompt = {
        name: 'num2',
        description: "What is the second number?",
        type: 'number',
        required: true,
    };

    const quitPrompt = {
        name: 'quit',
        description: "Do you want to quit after this operation?",
        type: 'boolean',
        required: 'true',
    };

    function stringToOperation(str) {
        if (!str) return 'add';
        if (str === '*' || str === 'multiply') return 'multiply';
        if (str === '-' || str === 'subtract') return 'subtract';
        if (str === '/' || str === 'division') return 'division';
        return 'add';
    }

    prompt.get([operation, num1Prompt, num2Prompt, quitPrompt], function(err, result) {
        if (result) {
            const quit = result.quit;

            const num1 = result.num1;
            if (isNaN(num1)) {
                console.log('First number is not a number, please try again');
                if (!quit) {
                    getInfo();
                }

                return;
            }

            const num2 = result.num2;
            if (isNaN(num2)) {
                console.log('Second number is not a number, please try again');
                if (!quit) {
                    getInfo();
                }
                return;
            }

            const operation = stringToOperation(result.stringToOperation);
            let operationFunction = undefined;
            switch (operation) {
                case 'multiply':
                    operationFunction = calc.multiplyTwoNumbers;
                    break;
                case 'subtract':
                    operationFunction = calc.subtractTwoNumbers;
                    break;
                case 'add':
                    operationFunction = calc.addTwoNumbers;
                    break;
                case 'divide':
                    operationFunction = calc.divideTwoNumbers;
                    break;
            }

            const numericalResult = operationFunction(num1, num2);

            console.log(`when you ${operation} ${num1} with ${num2} you get ${numericalResult}`);

            if (!quit) {
                getInfo();
            }
        } else if (err) {
            console.log(err);
        }
    });
}

getInfo();

// try {
//     console.log(calc.addTwoNumbers(1, 1));
// } catch (e) {
//     console.log(e);
// }

// try {
//     console.log(calc.multiplyTwoNumbers(5, 2));
// } catch (e) {
//     console.log(e);
// }

// try {
//     console.log(calc.multiplyTwoNumbers('Patrick'));
// } catch (e) {
//     console.log(e);
// }

// try {
//     console.log(calc.multiplyTwoNumbers(10, 2));
// } catch (e) {
//     console.log(e);
// }

// console.log(calc.description);