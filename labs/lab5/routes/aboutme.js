const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const me = {
            'name': 'Eric Altenburg',
            'cwid': '10443481',
            'biography': 'I am drowning in student loans. \n I also like to lift things up and put them down.',
            'favoriteShows': ['Lost', 'The Office', 'Parks and Recreation', 'The Good Place', 'Silicon Valley']
        };
        res.json(me);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;