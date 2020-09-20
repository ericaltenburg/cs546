function checkIsProperString (str, length) {
	if (str === undefined || str === null) throw `Error: string does not exist`;
	if (typeof str !== 'string') throw `Error: argument is not an string`;
    if (str.length <= length) throw `Error: string is not of length`;
    if (!str.replace(/\s/g, '').length) throw `Error: string is just white space`;
}



function camelCase(str) {
    checkIsProperString(str, 0);

    str = str.toLowerCase();
    console.log(str);

    let splitStr = str.split(" ");

    let strAns = "";

    for (let i = 0; i < splitStr.length; i++) {
        let tempStr = splitStr[i];
        strAns += tempStr.charAt(0).toUpperCase() + tempStr.slice(1);
    }

    return strAns.charAt(0).toLowerCase() + strAns.slice(1);
}

function replaceChar(str) {
    checkIsProperString(str, 0);

    // remove spaces in beginning if there are any 
    let ogLen = str.length;
    str = str.trimStart(); // remove leading white spaces
    let newLen = str.length;
    let count = ogLen - newLen;

    let decideChar = false;
    let firstUpper = str.charAt(0).toUpperCase();
    let firstLower = str.charAt(0).toLowerCase();

    let letters = [];
    letters.push(str.charAt(0));

    for (let i = 1; i < str.length; i++) {
        if (str.charAt(i) === firstLower || str.charAt(i) === firstUpper) {
            (!decideChar) ? letters.push("*") : letters.push("$");
            decideChar = !decideChar;
        } else {
            letters.push(str.charAt(i));
        }
    }

    let newStr = letters.join("");

    let spaces = "";
    for (let i = 0; i < count; i++) {
        spaces = spaces + " ";
    }

    return spaces + newStr;
}

function mashUp (str1, str2) {
    checkIsProperString(str1, 1);
    checkIsProperString(str2, 1);

    return str2.charAt(0) + str2.charAt(1) + str1.slice(2) + " " + str1.charAt(0) + str1.charAt(1) + str2.slice(2);
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
}