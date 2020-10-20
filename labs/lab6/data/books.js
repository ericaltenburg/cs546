const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
const moment = require('moment');
let { ObjectId } = require('mongodb');
const reviewsData = require('./reviews');


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
 * Verifies the array input, and has at least one element that is valid string, also
 * checks for duplicates
 * @param {Array} arr 
 */
function checkIsProperArr (arr) {
	if (arr === undefined || arr === null) throw `Error: array does not exist`;
	if (!Array.isArray(arr)) throw `Error: argument is not an array`;
    if (arr.length === 0) throw `Error: array is empty`;

    let seen = [];

    arr.forEach( (value) => {
        if (typeof value !== 'string') {
            throw `Error: ${value} is not a string`;
        } else {
            checkIsProperString(value);
        }

        if (seen[value]) {
            throw `Error: duplicates found`;
        } else {
            seen[value] = true;
        }
    });
}

/**
 * Checks to see if object is empty
 * @param {object} obj 
 */
function isEmpty (obj) {
    if (obj === undefined || obj === null) throw `Error: object does not exist`;
    if (typeof obj !== 'object' || obj === null) throw `Error: ${obj} is not an object`;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

/**
 * Checks to make sure the object is valid and has the first and last name
 * @param {Object} obj 
 */
function checkIsProperObj (obj) {
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
 * Creates a new array
 * @param {string} title 
 * @param {object} author 
 * @param {array} genre 
 * @param {date} datePublished 
 * @param {string} summary 
 */
async function create (title, author, genre, datePublished, summary) {
    checkIsProperString(title);
    title = title.trimStart();
    checkIsProperObj(author);
    checkIsProperArr(genre);
    checkIsProperDate(datePublished); // This might not work js
    checkIsProperString(summary);
    summary = summary.trimStart();

    const booksCollection = await books();

    const newBook = {
        title,
        author,
        genre,
        datePublished,
        summary,
        'reviews': []
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

    let idAndTitle = [];

    booksList.forEach( (value) => {
        value['_id'] = "" + value['_id'];

        idAndTitle.push({
            '_id': value['_id'],
            'title': value['title']});
    });

    return idAndTitle;
}   

/**
 * Updates book with the respective information, reviews does not change, they are carried over.
 * @param {object} obj 
 */
async function update (id, obj) {
    checkIsProperString(id);
    id = id.trimStart();

    const booksCollection = await books();
    const oldBook = await get(id);

    isEmpty(obj);
    let title = obj.title;
    let author = obj.author;
    let genre = obj.genre;
    let datePublished = obj.datePublished;
    let summary = obj.summary;

    if (title) {
        checkIsProperString(title);
        title = title.trimStart();
    }
    if (author){ 
        if (!author.authorFirstName && !author.authorLastName) throw `Error: no first name or last name`;
        if (isEmpty(author)) throw `Error: nothing given for author`;
        if (!author.authorFirstName) {
            checkIsProperString(author.authorLastName);
            author.authorFirstName = oldBook.author.authorFirstName;
        }
        if (!author.authorLastName) {
            checkIsProperString(author.authorFirstName);
            author.authorLastName = oldBook.author.authorLastName;
        }
    }
    if (genre) {
        checkIsProperArr(genre);

        oldBook.genre.forEach( (value) => { // make sure no duplicates
            let isSame = false;
            genre.forEach( (value1) => {
                if (value === value1) {
                    isSame = true;
                }
            });

            if (!isSame) {
                genre.push(value);
            }
        });
    }
    if (datePublished) checkIsProperDate(datePublished)
    if (summary) {
        checkIsProperString(summary);
        summary = summary.trimStart();
    }

    let newBook = {
        "title": (!title) ? oldBook.title : title,
        "author": (!author) ? oldBook.author : author,
        "genre": (!genre) ? oldBook.genre : genre,
        "datePublished": (!datePublished) ? oldBook.datePublished : datePublished,
        "summary": (!summary) ? oldBook.summary : summary,
        "reviews": oldBook.reviews
    }

    id = ObjectId(id).valueOf();
    const updateInfo = await booksCollection.updateOne(
        {_id: id},
        {$set: newBook}
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw `Error: Updated failed`;
    
    id = "" + id;
    return this.get(id);
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
    let reviewsToDelete = deletedBook.reviews;
    id = ObjectId(id);

    reviewsToDelete.forEach( (id) => { // remove the reviews
        reviewsData.remove(id);
    });

    const deletedInfo = await booksCollection.deleteOne({_id: id});
    if (deletedInfo.deletedCount === 0) throw `Error: could not delete the book with the id ${id}`;
    id = id + "";

    return {
        "bookId": id,
        "deleted": true
    };
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove
};