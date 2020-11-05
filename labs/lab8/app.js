const express = require('express');
const app = express();

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(express.json()); // to read request body
app.use(express.urlencoded({extended: true})); // for form data

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
configRoutes(app);

app.listen(3000, () => {
    console.log("We've got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});