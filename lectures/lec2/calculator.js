function checkIsProperNumber (val, variableName='provided variable') {
    if (typeof val !== 'number') throw `${variableName} is not a number`;
    if (isNaN(val)) throw `${variableName} is NaN`;
}

module.exports  = {
    description: 'This is a calculator for cs546',
    divideTwoNumbers: (num, den) => {
        checkIsProperNumber(num, 'numerator');
        checkIsProperNumber(den, 'denomintor');
        if (den === 0) throw 'Error: division by 0';

        return num/den;
    },
    addTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, 'first num');
        checkIsProperNumber(num2, 'second num');

        return num1+num2;
    },
    subtractTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, 'first num');
        checkIsProperNumber(num2, 'second num');

        return num1-num2;
    },
    multiplyTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, 'first num');
        checkIsProperNumber(num2, 'second num');

        return num1*num2;
    },
};

