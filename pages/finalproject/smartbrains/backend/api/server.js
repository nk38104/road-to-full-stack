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
    resp.send(database.users);
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

app.post("/register", (req, resp) => {
    const { email, username, password } = req.body;

    database.users.push({
        id:         "125",
        username:   username,
        password:   password,
        email:      email,
        entries:    0,
        joined:     new Date(),
    });

    resp.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, resp) => {
    const { id } = req.params;
    let found = false;

    database.users.filter(user => {
        if (user.id === id) {
            found = true;
            return resp.json(user);
        }
    });

    if(!found) {
        resp.status(404).json("User not found.");
    }
});

app.put("/image", (req, resp) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return resp.json(++(user.entries));
        }
    });

    if(!found) {
        resp.status(404).json("User not found.");
    }
});

app.listen(3000, () => {
    console.log("App is running on port 3000.");
});