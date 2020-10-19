const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
const moment = require('moment');
let { ObjectId } = require('mongodb');


/**
 * Verifies the string input
 * @param {string} str 
 */
function checkIsProperString (str) {
    if (str === undefined || str === null) throw "Error: string does not exist";
    if (typeof str !== 'string') throw `Error: ${str} is not of type string`;
    if (str.trim().length === 0) throw `String just whitespace`;
}

/**
 * Verifies the array input, and has at least one element that is valid string
 * @param {Array} arr 
 */
function checkIsProperArr (arr) {
	if (arr === undefined || arr === null) throw `Error: array does not exist`;
	if (!Array.isArray(arr)) throw `Error: argument is not an array`;
    if (arr.length === 0) throw `Error: array is empty`;
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'string') {
            throw `Error: ${arr[i]} is not a string`;
        } else {
            checkIsProperString(arr[i]);
        }
    }
}

/**
 * Checks to make sure the object is valid and has the first and last name
 * @param {Object} obj 
 */
function checkIsProperObj (obj) {
    if (obj === undefined || obj === null) throw `Error: object does not exist`;
    if (typeof obj !== 'object' || obj === null) throw `Error: ${obj} is not an object`;
    if (isEmpty(obj)) throw "Error: object is empty";
    if (!("authorFirstName" in obj)) throw `Error: object is missing author's first name`;
    checkIsProperString(obj['authorFirstName']);
    if (!("authorLastName" in obj)) throw `Error: object is missing author's last name`;
    checkIsProperString(obj['authorLastName']);
}

/**
 * Checks to make sure the Date is of valid format using moment.js
 * @param {Date} date 
 */
function checkIsProperDate (date) {
    if (date === undefined || date === null) throw `Error: date does not exist`;
    if (!(moment(date, 'MM/DD/YYYY', false).isValid())) throw `Error: date is not in the right format`;
}

/**
 * 
 * @param {string} title 
 * @param {Object} author 
 * @param {array} genre 
 * @param {date} datePublished 
 * @param {string} summary 
 * @param {array} reviews 
 */
async function create (title, author, genre, datePublished, summary, reviews) {
    checkIsProperString(title);
    title = title.trimStart();
    checkIsProperObj(author);
    checkIsProperArr(genre);
    checkIsProperDate(datePublished); // This might not work js
    checkIsProperString(summary);
    summary = summary.trimStart();
    checkIsProperArr(reviews);

    const booksCollection = await books();

    const newBook = {
        title,
        author,
        genre,
        datePublished,
        summarry,
        reviews
    };

    const insertInfo = await booksCollection.insertOne(newBook);
    if (insertInfo.insertCount === 0) throw `Error: could not add the book`

    const newId = insertInfo.insertedId + "";

    const aBook = await this.get(newId);
    return aBook;
}

/**
 * Grabs object at specified id
 * @param {string} id 
 */
async function get (id) {
    checkIsProperString(id);
    id = id.trimStart();
    id = ObjectId(id).valueOf();

    const booksCollection = await books();

    const theBook = await booksCollection.findOne({_id: id});
    if (!theBook) throw `Error: no book found with that id`;

    theBook['_id'] = "" + theBook['_id'];

    return theBook;
}

/**
 * Returns all the books in the database
 */
async function getAll() {
    const booksCollection = await books();

    const booksList = await booksCollection.find({}).toArray();

    booksList.forEach( (value) => {
        value['_id'] = "" + value['_id'];
    });

    return booksList;
}   


async function update () {
    console.log("IMPLEMENT ME");
}

/**
 * removes a given book based on id
 * @param {string} id 
 */
async function remove (id) {
    checkIsProperString(id);
    id = id.trimStart();

    const booksCollection = await books();

    const deletedBook = await get(id);
    let name = deletedBook.title;
    id = ObjectId(id);

    const deletedInfo = await booksCollection.deleteOne({_id: id});
    if (deletedInfo.deletedCount === 0) throw `Error: could not delete the book with the id ${id}`;

    return `${name} has been successfully deleted.`;
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove
};