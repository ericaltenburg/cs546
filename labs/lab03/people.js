const axios = require('axios');

/**
 * Grabs the people data from the gist
 */
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    // const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data // this will be the array of people objects
}

/**
 * Verifies the number input
 * @param {number} num 
 */
function checkIsProperNumber (num) {
    if (num === undefined || num === null) throw "Error: number does not exist";
	if (typeof num !== 'number') throw `Error: ${num} is NaN`
	if (num < 0 || num >= 1000) throw `Error: number is not within the bounds`
}

/**
 * Verifies the string input
 * @param {string} str 
 */
function checkIsProperString (str) {
    if (str === undefined || str === null) throw "Error: string does not exist";
    if (typeof str !== 'string') throw `Error: ${str} is not of type string`
    if (!str.replace(/\s/g, '').length) throw `Error: string is just white space`;
}

/**
 * Gets the person from the gist with a specific ID
 * @param {number} id 
 */
async function getPersonById (id) {
    checkIsProperNumber((id === undefined || id === null || typeof id !== 'number') ? id : (id-1));

    let daPeeps = await getPeople();

    let someone = daPeeps[id-1];

    return someone;
}

/**
 * Counts how many people are from a specified state abbreviation
 * @param {string} stateAbbrv 
 */
async function howManyPerState (stateAbbrv) {
    checkIsProperString(stateAbbrv);

    let daPeeps = await getPeople();

    let counter = 0;

    daPeeps.forEach( (person) => {
        let addr = person.address;

        if (addr.state === stateAbbrv) {
            counter ++;
        }
    });

    if (counter !== 0) {
        return counter;
    } else {
        throw `Error: no one is in the state ${stateAbbrv}`
    }
}

/**
 * Goes through people data, calculates age, then sorts them based on age.
 * Returns the person from that index
 * @param {number} index 
 */
async function personByAge (index) {
    checkIsProperNumber(index);

    let daPeeps = await getPeople();

    let today = new Date();
    let day = Date.parse(`${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`);
    let one_day = 24 * 60 * 60 * 1000;

    daPeeps.forEach ( (person) =>  {
        let bday = Date.parse(person.date_of_birth);
        let diff = new Date(day - bday);
        let diff_days = diff / one_day;
        let age = diff_days/365.25; // band aid solution
        person['age'] = age;
    });

    daPeeps.sort( (a, b) => b.age - a.age);
    let person = daPeeps[index];
    let ans = {};
    ans['first_name'] = person.first_name;
    ans['last_name'] = person.last_name;
    ans['date_of_birth'] = person.date_of_birth;
    ans['age'] = Math.floor(person.age);
    return ans;
}

/**
 * Returns the metrics of all the people.json
 * totalLetters
 * totalVowels
 * totalConsonants
 * longestName
 * shortestName
 * mostRepeatingCity
 * averageAge
 */
async function peopleMetrics() {
    let daPeeps = await getPeople();

    // Vals to be returned
    let totalLetters = 0;
    let totalVowels = 0;
    let totalConsonants = 0;
    let lenLongestName = 0;
    let indexLongestName = 0;
    let lenShortestName = (((daPeeps[0]).first_name).replace(/\s/g, '')).length + (((daPeeps[0]).last_name).replace(/\s/g, '')).length;
    let indexShortestName = 0;
    let ageSum = 0;

    // Repeating vars
    let entry = [];
    let count = [];

    // Object being returned
    let ans = {};

    // Age
    let today = new Date();
    let day = Date.parse(`${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`);
    let one_day = 24 * 60 * 60 * 1000;

    daPeeps.forEach ( (person, index) =>  {
        // Vowels and Consonants
        let firstName = person.first_name;
        firstName = firstName.toLowerCase();
        let lastName = person.last_name;
        lastName = lastName.toLowerCase();

        for (let i = 0; i < firstName.length; i++) { // Loop through the first names
            let asciiVal = firstName.charCodeAt(i);

            if (asciiVal > 96 && asciiVal < 123) {
                if (asciiVal === 97 || asciiVal === 101 || asciiVal === 105 || asciiVal === 111 || asciiVal === 117) { // a e i o u
                    totalVowels ++;
                } else { // rest
                    totalConsonants ++;
                }
            }
        }

        for (let i = 0; i < lastName.length; i++) { // Loop through the last names
            let asciiVal = lastName.charCodeAt(i);

            if (asciiVal > 96 && asciiVal < 123) {
                if (asciiVal === 97 || asciiVal === 101 || asciiVal === 105 || asciiVal === 111 || asciiVal === 117) { // a e i o u
                    totalVowels ++;
                } else { // rest
                    totalConsonants ++;
                }
            }
        }

        // Longest and Shortest, remove spaces
        let tempLen = (firstName.replace(/\s/g, '').length) + (lastName.replace(/\s/g, '').length);

        if (tempLen > lenLongestName) {
            lenLongestName = tempLen;
            indexLongestName = index;
        }

        if (tempLen < lenShortestName) {
            lenShortestName = tempLen;
            indexShortestName = index;
        }

        // Count repeating
        let isRepeat = false;
        let item = (person.address).city;

        for (let k = 0; k < entry.length; k++) {
            let state = entry[k];
            if (item === state) {
                count[k]++;
                isRepeat = true;
                break;
            }
        }
        
        if (!isRepeat) {
            entry.push(item);
            count.push(1);
        }


        // Age
        let bday = Date.parse(person.date_of_birth);
        let diff = new Date(day - bday);
        let diff_days = diff / one_day;
        let age = diff_days/365.25;
        ageSum += age;
    });
    
    totalLetters = totalConsonants + totalVowels;
    let maxState = 0;
    let maxIndex = 0;
    let counter = 0;
    count.forEach( (num, index) => {
        if (num > maxState) {
            maxState = num;
            maxIndex = index;
        }
    });

    count.forEach( (num) => {
        if (num === maxState) counter++;
    });

    ans['totalLetters'] = totalLetters;
    ans['totalVowels'] = totalVowels;
    ans['totalConsonants'] = totalConsonants;
    ans['longestName'] = `${daPeeps[indexLongestName].first_name} ${daPeeps[indexLongestName].last_name}`;
    ans['shortestName'] = `${daPeeps[indexShortestName].first_name} ${daPeeps[indexShortestName].last_name}`;
    ans['mostRepeatingCity'] = entry[maxIndex];
    ans['averageAge'] = Math.floor(ageSum/daPeeps.length);

    return ans;
}

module.exports = {
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
};