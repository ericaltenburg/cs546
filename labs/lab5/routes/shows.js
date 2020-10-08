const axios = require('axios');
const express = require('express');
const router = express.Router();

/**
 * Verifies the string input
 * @param {string} str 
 */
function checkIsProperString (str) {
    if (str === undefined || str === null) throw "ID was not supplied"; // I don't think this is possible but
    if (typeof str !== 'string') throw "ID was not parsed correctly";
    if (!str.replace(/\s/g, '').length) throw "ID was just whitespace";

    let num = Number(str);
    if (!Number.isInteger(num) || num < 1) throw "ID must be a positive integer";
}

/**
 * Grabs the shows data from the url http://api.tvmaze.com/shows/
 */
async function getShows() {
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    return data; // this will be the array of people objects
}

/**
 * Grabs the shows by an specific id
 * @param {number} id 
 */
async function getShowById(id) {
    checkIsProperString(id);
    let site = 'http://api.tvmaze.com/shows/' + id;
    const { data } = await axios.get(site);
    return data;
}

/**
 * in the root for shows route, it will return all the data found in the url:
 * http://api.tvmaze.com/shows
 */
router.get('/', async (req, res) => {
    try {
        const showings = await getShows();
        res.json(showings);
    } catch (e) {
        res.status(500).send();
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
        res.status(404).json({message: `Show with that ID cannot be found. ${e}.`});
    }
});

module.exports = router;