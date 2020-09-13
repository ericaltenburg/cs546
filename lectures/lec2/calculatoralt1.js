let description = 'This is an alt calculator for cs546';

function checkIsProperNumber (val, variableName='provided variable') {
    if (typeof val !== 'number') throw `${variableName} is not a number`;
    if (isNaN(val)) throw `${variableName} is NaN`;
}

function divideTwoNumbers (num, den) {
    checkIsProperNumber(num, 'numerator');
    checkIsProperNumber(den, 'denomintor');
    if (den === 0) throw 'Error: division by 0';

    return num/den;
}

function addTwoNumbers(num1, num2) {
    checkIsProperNumber(num1, 'first num');
    checkIsProperNumber(num2, 'second num');

    return num1+num2;
}

function subtractTwoNumbers(num1, num2) {
    checkIsProperNumber(num1, 'first num');
    checkIsProperNumber(num2, 'second num');

    return num1-num2;
}

function multiplyTwoNumbers(num1, num2) {
    checkIsProperNumber(num1, 'first num');
    checkIsProperNumber(num2, 'second num');

    return num1*num2;
}

module.exports = {
    description,
    divideTwoNumbers,
    addTwoNumbers,
    subtractTwoNumbers,
    multiplyTwoNumbers,
};