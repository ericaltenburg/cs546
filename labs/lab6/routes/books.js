const express = require('express');
const router = express.Router();
const data = require('../data');
const booksData = data.books;

/**
 * in the root for books, it will return all the books in the db
 */
router.get('/', async (req, res) => {
    try {
        const listOfBooks = await booksData.getAll();
        res.status(200).json(listOfBooks);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

/**
 * Creates a book with the given JSON
 */
router.post('/', async (req, res) => {
    try {
        const createdBook = await booksData.create(req.body);
        res.status(200).json(createdBook);
    } catch (e) {
        res.status(400).json({error: e});
    }
});

/**
 * in the /:id, it will return the book with the specified id
 */
router.get('/:id', async (req, res) => {
    try {
        const book = await booksData.get(req.params.id);
        res.status(200).json(book);
    } catch (e) {
        res.status(404).json({error: `Book with that _id cannot be found. ${e}.`});
    }
});

module.exports = router;