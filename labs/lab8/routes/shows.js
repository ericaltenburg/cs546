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
 * in the /:id, it will return the show with the specified id
 */
router.get('/:id', async (req, res) => {
    try {
        const show = await getShowById(req.params.id);

        res.render('shows/index', {thing: show.name, show: show});
    } catch (e) {
        res.status(404).render('shows/error', {thing: "Error", text: req.params.id, type2: true});
    }
});


module.exports = router;