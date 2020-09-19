function isEmpty (obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

function checkIsProperArr (arr) {
	if (arr === undefined || arr === null) throw `Error: array does not exist`;
    if (!Array.isArray(arr)) throw `Error: argument is not an array`;
    
    if (arr.length < 2) throw `Error: array need to have at least 2 objects in it`;
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'object') throw `Error: ${arr[i]} is not an object`;
        else if (isEmpty(arr[i])) throw `Error: ${arr[i]} is empty`;
    }
}

function checkIsProperObj (obj, extraCheck) {
    if (obj === undefined || obj === null) throw `Error: object does not exist`;
    if (typeof obj !== 'object' || obj === null) throw `Error: ${obj} is not an object`;
    if (extraCheck) {
        if (isEmpty(obj)) throw "Error: object is empty";
    }
}

function checkIsProperFunc (func) {
    if (func === undefined || func === null) throw `Error: function does not exist`;
    if (typeof func !== 'function') throw `Error: ${func} is not a function`;
}

function makeArrays (arr) {
    checkIsProperArr(arr);

    let ansArr = [];

    for (let i = 0; i < arr.length; i ++) { // loops through array of objects
        let tempObj = arr[i]; // obj
        for (const key in tempObj) { // for object
            let tempArr = [key, tempObj[key]];
            ansArr.push(tempArr);
        }

    }

    return ansArr;
}

function modifiedMakeArray (obj) {
    let ans = [];
    for (const key in obj) {
        let tempArr = [key, obj[key]];
        ans.push(tempArr);
    }
    return ans;
}

function compSort (a, b) { // I could've imported this, but I wasn't sure if I was allowed to export it from arrayUtils
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

function isDeepEqual (obj1, obj2) { // very very similar to isEqual
    checkIsProperObj(obj1, false);
    checkIsProperObj(obj2, false);

    let arr1 = modifiedMakeArray(obj1);
    let arr2 = modifiedMakeArray(obj2);

    if (arr1.length !== arr2.length) {
		return false;
    }
    
    arr1.sort();
    arr2.sort();
    arr1.sort(compSort);
    arr2.sort(compSort);


    for (let i = 0; i < arr1.length; i++) {
        let key1 = arr1[i][0];
        let val1 = arr1[i][1];

        let key2 = arr2[i][0];
        let val2 = arr2[i][1];

        if (key1 !== key2) {
            return false;
        } else if (val1 !== val2) { // the values might be objects again
            if ((typeof val1 === 'object' && val1 !== null) && (typeof val2 === 'object' && val2 !== null)) { // both are an object
                if (!isDeepEqual(val1, val2)) {
                    return false;
                }
            } else {
                return false;
            }
        }
	}

    return true;
}

function computeObject (obj, func) {
    checkIsProperObj(obj, true);
    checkIsProperFunc(func);
    let ans = {};
    for (const property in obj) {
        ans[property] = func(obj[property]);
    }

    return ans;
}

module.exports = {
    makeArrays, 
    isDeepEqual, 
    computeObject
};