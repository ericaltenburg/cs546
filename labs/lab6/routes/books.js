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
        res.status(500);
    }
});

/**
 * Creates a book with the given JSON
 */
router.post('/', async (req, res) => {
    let bookInfo = req.body;

    if (!bookInfo) {
        res.status(400).json({error: "You must provide data to create a book"});
        return;
    }
    if (!bookInfo.title) {
        res.status(400).json({error: "You must provide a title"});
        return;
    }   
    if (!bookInfo.author) {
        res.status(400).json({error: "You must provide an author"});
        return;
    }
    if (!bookInfo.genre) {
        res.status(400).json({error: "You must provide a genre"});
        return;
    }
    if (!bookInfo.datePublished) {
        res.status(400).json({error: "You must provide a date published"});
        return;
    }
    if (!bookInfo.summary) {
        res.status(400).json({error: "You must provide a summary"});
        return;
    }

    try {
        const createdBook = await booksData.create(bookInfo.title, bookInfo.author, bookInfo.genre, bookInfo.datePublished, bookInfo.summary);
        res.status(200).json(createdBook);
    } catch (e) {
        res.status(400).json({error: e});
    }
});

/**
 * in the /:id, it will return the book with the specified id
 */
router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an id' });
        return;
    }

    try {
        const book = await booksData.get(req.params.id);
        res.status(200).json(book);
    } catch (e) {
        res.status(404).json({error: `Book not found with that id.`});
    }
});

/**
 * in the /:id, for a put request, it will update all information for the book,
 * must have all params
 */
router.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an id' });
        return;
    }

    let bookInfo = req.body;

    if (!bookInfo) {
        res.status(400).json({error: "You must provide data to create a book"});
        return;
    }
    if (!bookInfo.title) {
        res.status(400).json({error: "You must provide a title"});
        return;
    }   
    if (!bookInfo.author) {
        res.status(400).json({error: "You must provide an author"});
        return;
    }
    if (!bookInfo.genre) {
        res.status(400).json({error: "You must provide a genre"});
        return;
    }
    if (!bookInfo.datePublished) {
        res.status(400).json({error: "You must provide a date published"});
        return;
    }
    if (!bookInfo.summary) {
        res.status(400).json({error: "You must provide a summary"});
        return;
    }

    try {
        await booksData.get(req.params.id);
    } catch (e) {
        res.status(404).json({error: "Book not found with that id"});
        return;
    }

    try {
        const book = await booksData.update(req.params.id, bookInfo);
        res.status(200).json(book);
    } catch (e) {
        res.status(400).json({error: e});
    }
});

/**
 * in the /:id, for a patch request, it will 
 */
router.patch('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an id' });
        return;
    }

    const requestBody = req.body;
    let updatedObject = {};

    try { // see if you can find the book and then set values to what's changed
        const oldBook = await booksData.get(req.params.id);

        if (requestBody.title && requestBody.title !== oldBook.title) updatedObject.title = requestBody.title;
        if (requestBody.author && requestBody.author !== oldBook.author) updatedObject.author = requestBody.author;
        if (requestBody.genre && requestBody.genre !== oldBook.genre) updatedObject.genre = requestBody.genre;
        if (requestBody.datePublished && requestBody.datePublished !== oldBook.datePublished) updatedObject.datePublished = requestBody.datePublished;
        if (requestBody.summary && requestBody.summary !== oldBook.summary) updatedObject.summary = requestBody.summary;
    } catch (e) {
        res.status(404).json({error: "Book not found with that id"});
        return;
    }

    if (Object.keys(updatedObject).length !== 0) {
        try {
            const updatedBook = await booksData.update(req.params.id, updatedObject);
            res.status(200).json(updatedBook);
        } catch (e) {
            res.status(400).json({error: e});
        }
    } else {
        res.status(400).json({error: "No fields have been changed from their initial values, so no update has occurred"});
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an id' });
        return;
    }

    try {
        await booksData.get(req.params.id);
    } catch (e) {
        res.status(404).json({error: "Book not found with that id"});
        return;
    }

    try {
        let deletedBook = await booksData.remove(req.params.id);
        res.status(200).json(deletedBook);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = router;