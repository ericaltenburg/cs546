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
}

/**
 * Grabs the shows by an specific term
 * @param {string} term 
 */
async function getShowBySearchTerm(term) {
    checkIsProperString(term);
    let site = 'http://api.tvmaze.com/search/shows?q=' + term;
    const { data } = await axios.get(site);
    return data;
}

router.post('/', async (req,res) => {
    let searchData = req.body;
    let errors = [];

    if (!searchData.searchTerm) {
        errors.push('No search term provided');
    }

    if (errors.length > 0) {
        res.render('/shows/search', {term: searchData.searchTerm, hasErrors: true, errors: errors});
        return;
    }
    try {
        const shows = await getShowBySearchTerm(searchData.searchTerm);
        if (shows.length > 20) {
            shows = shows.slice(20);
        }
        
        res.render('shows/found', { thing: "Shows Found", thing2: "Shows Found", shows: shows, term: searchData.searchTerm });
    } catch (e) {
        res.status(400).render('shows/error', { thing: "Error", text : searchData.searchTerm, type1: true});
    }
});

module.exports = router;