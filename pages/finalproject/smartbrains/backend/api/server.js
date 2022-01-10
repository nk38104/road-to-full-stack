const express = require("express");

/*
    -------------
    - ENDPOINTS -
    -------------
    /                   --> resp with home page
    /signin             --> POST, resp with succes||fail
    /register           --> POST, new user
    /profile/:userID    --> GET, resp with user page
    /image              --> PUT, resp with updated user 
*/

const app = express();

app.get("/", (req, resp) => {
    resp.send("Hello, there. Welcome to Home page!");
})

app.listen(3000, () => {
    console.log("App is running on port 3000.");
});