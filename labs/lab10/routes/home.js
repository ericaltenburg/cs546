const express = require("express");
const router = express.Router();
const bcr = require("bcrypt");
const users = require("../users");


router.get('/', async (req, res) => {
    if (!req.session.user) {
        res.render('auth/login', {});
    } else {
        res.redirect('/private');
    }
});

router.post('/login', async (req, res) => {
    let loginData = req.body;
    let errors = [];
    let comparePass = false;

    let foundUser = users.find( (element) => element.username === loginData.username);
    if (!loginData.username || !foundUser) {
        errors.push("No valid username was provided.");
    }

    if (!loginData.password) {
        errors.push("No valid password was provided.");
    } else {
        
        try {
            comparePass = await bcr.compare(loginData.password, foundUser.hashedPassword);
        } catch (e) {
            //no op 
        }

        if (!comparePass) {
            errors.push("Incorrect password and or username"); // throw em off
        }
    }

    if (errors.length > 0) {
        res.status(401).render('auth/login', {hasErrors: true, term: loginData.username, errors: errors});
        return;
    }

    req.session.user = {
        _id: foundUser._id,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        profession: foundUser.profession,
        bio: foundUser.bio
    };
    res.redirect('/private');
});

router.get('/private', async (req, res) => {
    let loggedInUser = req.session.user;

    res.render('auth/private', {
        _id: loggedInUser._id, 
        username: loggedInUser.username,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        profession: loggedInUser.profession,
        bio: loggedInUser.bio
    });
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('auth/goback', {});
})

module.exports = router;