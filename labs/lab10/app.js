const express = require("express");
const app = express();
const session = require("express-session");
const exphbs = require("express-handlebars")
const static = express.static(__dirname + "../public");
const configRoutes = require("./routes");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true
}));

app.use('/private', (req, res, next) => {
    if (!req.session.user) {
        res.status(403).render('auth/goback', {hasErrors: true, errors: "You are not logged in."});
    } else {
        next();
    }
});

app.use(async (req, res, next) => {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end();
    } else {
        let currTimestamp = new Date().toUTCString();
        let reqMethod = req.method;
        let reqRoute = req.originalUrl;
        let isAuthenticated = (!req.session.user) ? false : true;
    
        console.log(`[${currTimestamp}]: ${reqMethod} ${reqRoute} (${(isAuthenticated) ? "Authenticated" : "Non-Authenticated"} User)`);
    }
    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server :)");
    console.log("Your routes will be running on http://localhost:3000\n");
});