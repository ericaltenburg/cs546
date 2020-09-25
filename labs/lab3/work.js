const axios = require('axios');

/**
 * Grabs the people data from the gist
 */
async function getPeople (){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    // const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data // this will be the array of people objects
}

/**
 * Grabs the work data from the gist
 */
async function getWork () {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

/**
 * Makes sure the input string exists, is a string type, and has the form 
 * ###-###-#### or ###-##-#### through a lil regex thingie I wrote :) 
 * @param {string} str 
 */
function checkIsProperString (str, isPhone) {
    if (str === undefined || str === null) throw `Error: string does not exist`;
    if (typeof str !== 'string') throw `Error: argument is not an string`;
    if (isPhone) {
        let reg = /^(\d{3}-){2}\d{4}$/;
        if (!reg.exec(str)) throw `Error: ${str} is not in the format ###-###-####`;
    } else {
        let reg = /^\d{3}-\d{2}-\d{4}$/;
        if (!reg.exec(str)) throw `Error: ${str} is not in the format ###-##-####`;
    }
}    

/**
 * Lists all the companies and their employees by looking up the id in the 
 * work JSON and searching through the people JSON
 */
async function listEmployees () {
    const daPeeps = await getPeople();
    const companies = await getWork();

    let ans = [];

    companies.forEach( (comp) => {
        let company_name = comp.company_name;
        let employeeIDs = comp.employees;
        let employees = [];

        employeeIDs.forEach( (id) => {
            let employeeByID = {};
            employeeByID['first_name'] = daPeeps[id-1].first_name;
            employeeByID['last_name'] = daPeeps[id-1].last_name;
            employees.push(employeeByID);
        });

        let tempObj = {
            company_name,
            employees
        };

        ans.push(tempObj);
    });

    return ans;
}

/**
 * Checks to see if string is valid, then looks up the phone number in the 
 * work JSON and adds the name and address to an object. Returns if it
 * exits or throws an error.
 * @param {string} phoneNumber 
 */
async function fourOneOne (phoneNumber) {
    checkIsProperString(phoneNumber, true);
    
    let companies = await getWork();
    let ans;

    companies.forEach( (comp) => { // I hate how forEach doesn't allow for breaks
        let compNum = comp.company_phone;
        if (phoneNumber === compNum) {
            let company_name = comp.company_name;
            let company_address = comp.company_address;
            ans = {
                company_name,
                company_address
            };
        }
    });

    if (ans) {
        return ans;
    } else {
        throw `Error: ${phoneNumber} does not correspond to a company`;
    }
}

/**
 * Given a valid ssn, it will search for the person in the people JSON,
 * if not then it will throw an error. Then it will take their ID and find
 * out where they work by searching through the company IDs
 * @param {*} ssn 
 */
async function whereDoTheyWork (ssn) {
    checkIsProperString(ssn, false);

    let daPeeps = await getPeople();
    let companies = await getWork();

    let id = 0;
    let str;

    daPeeps.forEach( (person) => {
        if (ssn === person.ssn) {
            id = person.id;
            str = `${person.first_name} ${person.last_name} works at `;
        }
    });

    if (id === 0) throw `Error: Someone with the SSN ${ssn} could not be found`;

    companies.forEach( (comp) => {
        let employees = comp.employees;
        for (let i = 0; i < employees.length; i++) {
            if (id === employees[i]) {
                str += comp.company_name;
            }
        }
    });

    return str;
}

module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
};