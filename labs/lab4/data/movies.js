const mongoCollections = require('../config/mongoCollections')
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb');

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
 * Verifies the array input, and has at least one element that is valid string
 * @param {Array} arr 
 */
function checkIsProperArr (arr) {
	if (arr === undefined || arr === null) throw `Error: array does not exist`;
	if (!Array.isArray(arr)) throw `Error: argument is not an array`;
    if (arr.length === 0) throw `Error: array is empty`
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'string') {
            throw `Error: ${arr[i]} is not a string`;
        } else {
            checkIsProperString(arr[i]);
        }
    }
}

/**
 * returns the number of digits for a number
 * @param {number} num 
 */
function numDigits (num) {
    let count = 1;
    while ( (num /= 10) >= 1) {
        count ++;
    }
    return count;
}

/**
 * Checks if it is a proper number
 * @param {number} year 
 */
function checkIsProperYear (year) {
    if (year === undefined || year === null) throw `Error: year does not exist`;
    if (typeof year !== 'number') throw `Error: ${year} is not of type number`;
    if (numDigits(year) !== 4) throw `Error: ${year} is not 4 digits`;
    let currYearFive = (new Date().getFullYear()) + 5;
    if (year < 1930 || year > currYearFive) throw `Error: ${year} must be greater than 1930 and smaller than ${currYearFive}`;
} 

/**
 * Checks if empty
 * @param {object} obj 
 */
function isEmpty (obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

/**
 * Verifies input is an object
 * @param {Objec} obj 
 */
function checkIsProperObj (obj) {
    if (obj === undefined || obj === null) throw `Error: object does not exist`;
    if (typeof obj !== 'object' || obj === null) throw `Error: ${obj} is not an object`;
    if (isEmpty(obj)) throw "Error: object is empty";
    if (!('director' in obj)) {
        throw `Error: ${obj} does not have the key 'director'`;
    } else {
        checkIsProperString(obj.director);
    }
    if (!('yearReleased' in obj)) {
        throw `Error: ${obj} does not have the key 'yearReleased'`;
    } else {
        checkIsProperYear(obj.yearReleased);
    }
}

/**
 * Inserts movie in db
 * @param {string} title 
 * @param {string} plot 
 * @param {string} rating 
 * @param {string} runtime 
 * @param {string} genre 
 * @param {array} cast 
 * @param {object} info 
 */
async function create (title, plot, rating, runtime, genre, cast, info) {
    checkIsProperString(title);
    title = title.trimStart();
    checkIsProperString(plot);
    plot = plot.trimStart();
    checkIsProperString(rating);
    rating = rating.trimStart();
    checkIsProperString(runtime);
    runtime = runtime.trimStart();
    checkIsProperString(genre);
    genre = genre.trimStart();
    checkIsProperArr(cast);
    checkIsProperObj(info);

    const moviesCollection = await movies();

    const newMovie = {
        title,
        plot,
        rating,
        runtime,
        genre,
        cast,
        info
    };

    const insertInfo = await moviesCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw `Error: could not add movie`

    const newId = insertInfo.insertedId + "";

    const aMovie = await this.get(newId);
    return aMovie;
}   

/**
 * Returns all the movies in the database
 */
async function getAll() {
    const moviesCollection = await movies();

    const moviesList = await moviesCollection.find({}).toArray();

    moviesList.forEach( (value) => {
        value['_id'] = "" + value['_id'];
    });

    return moviesList;
}

/**
 * Grabs object at specified id
 * @param {_id} id 
 */
async function get(id) {
    checkIsProperString(id);
    id = id.trimStart();
    id = ObjectId(id).valueOf();

    const moviesCollection = await movies();

    const theMovie = await moviesCollection.findOne({_id: id});
    if (!theMovie) throw `Error: no movie with that id`;

    // Modify the _id field to convert to string
    theMovie['_id'] = "" + theMovie['_id'];

    return theMovie;
}

/**
 * removes a given movies based on id
 * @param {string} id 
 */
async function remove(id) {
    checkIsProperString(id);
    id = id.trimStart();

    const moviesCollection = await movies();

    const deletedMovie = await get(id);
    id = ObjectId(id);

    const deletionInfo = await moviesCollection.deleteOne({_id: id});

    if (deletionInfo.deletedCount === 0) throw `Error: could not delete movie with id ${id}`;

    return deletedMovie;

}

/**
 * renames movie title by given id
 * @param {string} id 
 * @param {string} newTitle 
 */
async function rename(id, newTitle) {
    checkIsProperString(id);
    id = id.trimStart();
    checkIsProperString(newTitle);
    newTitle = newTitle.trimStart();

    const moviesCollection = await movies();

    id = ObjectId(id);
    const updatedInfo = await moviesCollection.updateOne(
        {_id: id},
        {$set: {title: newTitle}}
    );

    if (updatedInfo.modifiedCount === 0) throw `Error: could not update movie title`;

    return await this.get(id.toString());
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
}