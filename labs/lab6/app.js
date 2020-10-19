const { checkIsProperDate } = require('./data/books');
const books = require('./data/books');

try {
    books.checkIsProperDate('1-28-1977');
} catch (e) {
    console.log(e);
}