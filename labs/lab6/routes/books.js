const express = require('express');
const router = express.Router();
const data = require('../data');
const booksData = data.books;

/**
 * in the root for shows route, it will return all the data found in the url:
 * http://api.tvmaze.com/shows
 */
router.get('/', async (req, res) => {
    try {
        const showings = await getShows();
        res.json(showings);
    } catch (e) {
        // res.status(500).send();
        res.status(500).json({error: e});
    }
});

/**
 * in the /:id, it will return the show with the specified id
 */
router.get('/:id', async (req, res) => {
    try {
        const show = await getShowById(req.params.id);
        res.json(show);
    } catch (e) {
        res.status(404).json({error: `Show with that ID cannot be found. ${e}.`});
    }
});

module.exports = router;