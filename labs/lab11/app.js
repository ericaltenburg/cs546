const express = require('express');
const app = express();
const static = express.static(__dirname + "/public");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get("*", (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("We've not got a server!");
    console.log("Your route will be running on http://localhost:3000 :)");
});