function checkIsProperArr (arr, extraChecks) {
	if (arr === undefined || arr === null) throw `Error: array does not exist`;
	if (!Array.isArray(arr)) throw `Error: argument is not an array`;

	if (extraChecks) {
		if (arr.length === 0) throw `Error: array is empty`
		for (let i = 0; i < arr.length; i++) {
			if (typeof arr[i] !== 'number') throw `Error: ${arr[i]} is NaN`;
		}
	}
}

function checkIsProperNumber (num) {
	if (num === undefined || num === null) throw "Error: number does not exist";
	if (typeof num !== 'number') throw `Error: ${num} is NaN`
	if (num <= 0 || num % 1 !== 0) throw `Error: ${num} is not a positive integer greater than 0`
}

function mean (arr) {
	checkIsProperArr(arr, true);
	let sum = 0;
	let arrLen = arr.length;
	for (let i = 0; i < arrLen; i++) {
		sum += arr[i];
	}
	return sum/arrLen;
}

function medianSquared (arr) {
	checkIsProperArr(arr, true);
	arr = arr.sort( (a, b) => a-b); // I hate how JS does sort

	let arrLen = arr.length;
	let start = 0;
	let end = arrLen-1;
	let median = start + (end-start)/2;

	let ans = (arrLen % 2 !== 0) ? arr[median] : (arr[Math.floor(median)]+arr[Math.ceil(median)])/2;
	return ans*ans;
}

function maxElement (arr) {
	checkIsProperArr(arr, true);
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

function countRepeating (arr) {
	checkIsProperArr(arr, false);

	let ans = {};

	if (arr.length === 0) {
		return ans;
	}

	let entry = [];
	let count = [];

	for (let i = 0; i < arr.length; i++) {
		let isRepeat = false;
		for (let j = 0; j < entry.length; j++) {
			if (entry[j] == arr[i]) {
				count[j]++;
				isRepeat = true;
			}
		}

		if (!isRepeat) {
			entry.push(arr[i]);
			count.push(1);
		}
	}

	for (let i = 0; i < entry.length; i++) {
		if (count[i] > 1) {
			ans[entry[i]] = count[i];
		}
	}

	return ans;
}

function compSort (a, b) {
	if (typeof a === 'number' && typeof b === 'string') { // Prioritize numbers
		return -1;
	} else if (typeof b === 'number' && typeof a === 'string') {
		return 1;
	} else if (typeof a === 'boolean' && typeof b === 'string') { // Prioritize booleans
		return -1;
	} else if (typeof b === 'boolean' && typeof a === 'string') {
		return 1;
	} else if (Array.isArray(a) && !Array.isArray(b)) { // Prioritize non-arrays
		return 1;
	} else if (!Array.isArray(a) && Array.isArray(b)) {
		return -1;
	} else { // Sort based on numbers so that it goes 1, 2, 10 and not 1, 10, 2
		return a-b;
	}
}

function isEqual(arr1, arr2) {
	checkIsProperArr(arr1, false);
	checkIsProperArr(arr2, false);

	if (arr1.length !== arr2.length) {
		return false;
	}

	// Don't mind this disgusting comparison function, because I hate the OG sort function
	// I had to prioritize certain types so some get sorted before others, this way the two
	// arrays will be the same (with the exception of the inner arrays not being sorted
	// immediately). So I make numbers go before strings (623 vs '623'), bools before strings 
	// (false vs 'false'), and non-arrays before arrays. If you want to see the complete and
	// utter hot garbage I wrote trying to figure out different ways to do this, check out
	// the big commented section below the sorting lol rip 4 hours of my life

	arr1.sort();
	arr2.sort();

	arr1.sort(compSort);
	arr2.sort(compSort);

	/* ----------------------------------------------------------------------
	// pick and choose if same delete from both arrays, if both are empty by end return tru else false

	// let i = 0;
	// while (i < arr1.length) {
	// 	let item1 = arr1[i];

	// 	let j = i;
	// 	while (j < arr2.length) {
	// 		if (Array.isArray(item1) && Array.isArray(arr2[j])) { // the two items are an array, then do a recursive call
	// 			if (!isEqual(item1, arr2[j])) {
	// 				return false;
	// 			} else {
	// 				break;
	// 			}
	// 		} 
			
	// 		if (arr2[j] === item1) { // if it's the same item, them remove it
	// 			arr2.splice(j, 1);
	// 			arr1.splice(i, 1);
	// 			i--;
	// 			break;
	// 		}
	// 		j++;
	// 	}
	// 	i++;
	// }

	// if (arr1.length === arr2.length) {
	// 	for (let k = 0; k < arr1.length; k++) {
			
	// 		if (arr1[k].length !== 0 && arr2[k].length !== 0) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// } else {
	// 	return false;
	// }
	// console.log(arr1);
	// console.log(arr2);
	---------------------------------------------------------------------- */ 

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
				if (!isEqual(arr1[i], arr2[i])) {
					return false;
				}
			} else {
				return false;
			}
		}
	}

	return true;
}


module.exports = {
	mean, 
	medianSquared, 
	maxElement,
	fill,
	countRepeating,
	isEqual
};