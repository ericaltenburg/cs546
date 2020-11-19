const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    // if (!req.session.user) {
    //     res.render('auth/login');
    // } else {
    //     res.render('auth/private');
    // }
    res.render('auth/login');
});


module.exports = router;