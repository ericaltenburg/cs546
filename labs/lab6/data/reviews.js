const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
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
 * Checks to make sure the Date is of valid format using moment.js
 * @param {Date} date 
 */
function checkIsProperDate (date) {
    if (date === undefined || date === null) throw `Error: date does not exist`;
    if (!(moment(date, 'MM/DD/YYYY', false).isValid())) throw `Error: date is not in the right format`;
}

/**
 * Verifies that the number input is valid 
 * @param {number} num 
 */
function checkIsProperNumber (num) {
	if (num === undefined || num === null) throw "Error: number does not exist";
	if (typeof num !== 'number') throw `Error: ${num} is NaN`;
	if (num < 0) throw `Error: ${num} has to be 0 or more`;
}

/**
 * 
 * @param {string} title 
 * @param {string} reviewer 
 * @param {string} bookBeingReviewed 
 * @param {number} rating 
 * @param {date} dateOfReview 
 * @param {string} review 
 */
async function create (title, reviewer, bookBeingReviewed, rating, dateOfReview, review) {
    checkIsProperString(title);
    title = title.trimStart();
    checkIsProperString(reviewer);
    reviewer = reviewer.trimStart();
    checkIsProperString(bookBeingReviewed);
    bookBeingReviewed = bookBeingReviewed.trimStart();
    checkIsProperNumber(rating);
    checkIsProperDate(dateOfReview);
    checkIsProperString(review);
    review = review.trimStart();

    const reviewsCollection = await reviews();

    const newReview = {
        title,
        reviewer,
        bookBeingReviewed,
        rating,
        dateOfReview,
        review
    };

    const insertInfo = await reviewsCollection.insertOne(newReview);
    if (insertInfo.insertCount === 0) throw `Error: could not add the reivew`;

    const newId = insertInfo.insertedId + "";

    const aReview = await this.get(newId);
    return aReview;
}

/**
 * grabs review by string
 * @param {string} id 
 */
async function get (id) {
    checkIsProperString(id);
    id = id.trimStart();
    id = ObjectId(id).valueOf();

    const reviewsCollection = await reviews();

    const theReview = await reviewsCollection.findOne({_id: id});  
    if (!theReview) throw `Error: no review with that id`;

    theReview['_id'] = "" + theReview['_id'];

    return theReview;
}

/**
 * Returns al the reviews in the database
 */
async function getAll () {
    const reviewsCollection = await reviews();

    const reviewsList = await reviewsCollection.find({}).toArray();

    reviewsList.forEach( (value) => {
        value['_id'] = "" + value['_id'];
    });

    return reviewsList;
}

/**
 * Removes the string at the specified id from the database
 * @param {string} id 
 */
async function remove (id) {
    checkIsProperString(id);   
    id = id.trimStart();
    
    const reviewsCollection = await reviews();

    const deletedReview = await get(id);
    let name = deletedReview.title;
    id = ObjectId(id);
    
    const deletedInfo = await reviewsCollection.deletedOne({_id: id});
    if (deletedInfo.deletedCount === 0) throw `Error: could not delete the book with the id ${id}`;

    return `${name} has successfully been deleted.`;
}

module.exports = {
    create,
    get,
    getAll,
    remove
};