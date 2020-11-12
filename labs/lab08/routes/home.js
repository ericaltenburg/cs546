const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('shows/search', {thing: "Show Finder", thing2: "Show Finder", para: "Welcome to Show Finder! Here you will be able to toss in any old word and get back a show. Fantastic I hear you saying, and you are correct!"});
    } catch (e) {
        res.status(500).json({error: e});
    }
});


module.exports = router;