const express = require('express');


const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Home page");
});

app.get("/profiles", (req, res) => {
    res.send("Profile page");
});

app.post("/profiles", (req, res) => {
    res.send(req.body);
});

app.listen(3000);