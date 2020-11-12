/*
 * Author: 			Eric Altenburg
 * Date: 			11 September 2020
 * Description:  	Lab 1
 * Pledge: 			I pledge my honor that I have abided by the Stevens Honor System.
 */

const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let primes = {};
    if (arr === undefined || arr.length === 0) { // Error handling
    	return primes;
    }

    for (let i = 0; i < arr.length; i++) { // For each number in arr
    	let num = arr[i];
    	let prime = true;

    	if (num == 0 || num == 1) { // 0 and 1 are not prime
    		prime = false;
    	} else {
	    	for (let j = 2; j <= num / 2; j++) { // go up to half the number and do mods
	    		if (num % j == 0) {
	    			prime = false;
	    		}
	    	}    		
    	}

    	primes[num] = prime ? true : false;
    }

    return primes;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    if (arr === undefined || arr.length === 0) { // Error handling
    	return 0;
    }
    let sum = 0;
    const summation = (num) => sum += Math.pow(num, 2);
    arr.forEach(summation);

    return Math.sqrt(Math.pow(sum, 6));
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let qualities = {consonants: 0,  vowels: 0,  numbers: 0, spaces: 0,  punctuation: 0, specialCharacters: 0};
    if (text === undefined || text.length === 0) { // Error handling
    	return qualities;
    }
    // To limit the ascii numbers used for cap and low
    text = text.toLowerCase();

    for (let i = 0; i < text.length; i++) { // Grab ascii val for each char in string
    	let asciiVal = text.charCodeAt(i);

    	if (asciiVal > 96 && asciiVal < 123) { // a lowercase letter
    		if (asciiVal === 97 || asciiVal === 101 || asciiVal === 105 || asciiVal === 111 || asciiVal === 117) { // a e i o u
    			qualities.vowels += 1;
    		} else { // rest
    			qualities.consonants += 1;
    		}
    	} else if (asciiVal > 47 && asciiVal < 58) { // numbers
    		qualities.numbers += 1;
    	} else if (asciiVal === 32) { // space
    		qualities.spaces += 1;
    	} else if (asciiVal === 46 || asciiVal === 63 || asciiVal === 34 || asciiVal === 39 || asciiVal === 44 || asciiVal === 45 || asciiVal === 150 || asciiVal === 151 || asciiVal === 33 || asciiVal === 58 || asciiVal === 59 || asciiVal === 40 || asciiVal === 41 || asciiVal === 91 || asciiVal === 93 || asciiVal === 47) { // punctuation
    		qualities.punctuation += 1;
    	} else { // specialCharacter
    		qualities.specialCharacters += 1;
    	}
    }

    return qualities;
}

const questionFour = function questionFour(num1, num2,num3) {
    // Implement question 4 here
    if (num1 === undefined || num2 === undefined || num3 === undefined || num1 === undefined || num1 < 0 || num2 < 0 || num3 < 0) { // Error handling
		return -1;
	}

	// Equation from calculator soup :)
	let PV = num1;
	let i = (num2 / 100)/12;
	let n = num3 * 12;
	let iPrime = Math.pow((1+i), n);
	let ans;
	if (i === 0) {
		ans = PV/n;
	} else {
		ans = (PV * i * iPrime)/(iPrime - 1);
	}

	return parseFloat(ans.toFixed(2), 10);
}

module.exports = {
    firstName: "Eric", 
    lastName: "Altenburg", 
    studentId: "10443481",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};