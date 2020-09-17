function checkIsProperArr (arr) {
	if (arr === undefined || arr === null) throw `Error: array does not exist`;
	if (!Array.isArray(arr)) throw `Error: argument is not an array`;
	if (arr.length === 0) throw `Error: array is empty`
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] !== 'number') throw `Error: ${arr[i]} is NaN`;
	}
}

function checkIsProperNumber (num) {
	if (num === undefined || num === null) throw "Error: number does not exist";
	if (typeof num !== 'number') throw `Error: ${num} is NaN`
	if (num <= 0 || num % 1 !== 0) throw `Error: ${num} is not a positive integer greater than 0`
}

function mean (arr) {
	checkIsProperArr(arr);
	let sum = 0;
	let arrLen = arr.length;
	for (let i = 0; i < arrLen; i++) {
		sum += arr[i];
	}
	return sum/arrLen;
}

function medianSquared (arr) {
	checkIsProperArr(arr);
	arr = arr.sort( (a, b) => a-b); // I hate how JS does sort

	let arrLen = arr.length;
	let start = 0;
	let end = arrLen-1;

	arr.forEach( (element, index) => arr[index] = element * element);

	let median = start + (end-start)/2;

	return (arrLen % 2 !== 0) ? arr[median] : (arr[Math.floor(median)]+arr[Math.ceil(median)])/2;
}

function maxElement (arr) {
	checkIsProperArr(arr);
	let max = 0;
	let index = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
			index = i;
		}
	}

	let ans = {
		[max]: index
	};

	return ans;
}

function fill (end, value) {
	checkIsProperNumber(end);

	let arr = [];

	for (let i = 0; i < end; i++) {
		arr.push( (value === undefined) ? i+1 : value)
	}

	return arr;
}

module.exports = {
	mean, 
	medianSquared, 
	maxElement,
	fill
};