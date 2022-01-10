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
app.use(express.json());

const database = {
    users: [
        {
            id:         "123",
            username:   "John",
            password:   "john123",
            email:      "john@gmail.com",
            entries:    0,
            joined:     new Date(),
        },
        {
            id:         "124",
            username:   "Liza",
            password:   "liza123",
            email:      "liza@gmail.com",
            entries:    0,
            joined:     new Date(),
        }
    ],
}

app.get("/", (req, resp) => {
    resp.send("Hello, there. Welcome to Home page!");
});

app.post("/signin", (req, resp) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            resp.json("You are logged in.");
    }
    else {
        resp.status(400).json("Error loggin in.");
    }
});

app.listen(3000, () => {
    console.log("App is running on port 3000.");
});