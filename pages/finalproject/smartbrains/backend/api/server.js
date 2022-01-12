const express       = require("express");
const bcrypt        = require('bcryptjs');
const cors          = require("cors");
const knex          = require("knex");
const app_passwords = require("./my_passwords");


// Database connection settings
const database = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        port: 5432,
        password: app_passwords.POSTGRES_PASSWORD, // Make your my_password.js file and export passwords from there or enter your database password here and delete app_passwords variable
        database: "smartbrain",
    }
});

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
app.use(cors());

app.get("/", (req, resp) => {
    resp.send(databaseTemp.users);
});


app.post("/signin", (req, resp) => {
    const { email, password } = req.body;
    
    database.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(user => {
        const isValid = bcrypt.compareSync(password, user[0].hash);

        if (isValid) {
            return database.select("*")
            .from("users")
            .where("email", "=", email)
            .then(user => {
                resp.json(user[0]);
            })
            .catch(() => resp.status(400).json("Unable to get user info."));
        } else {
            resp.status(400).json("Wrong credentials.");
        }
    })
    .catch(() => resp.status(400).json("Wrong credentials."));
});


app.post("/register", (req, resp) => {
    const { email, username, password } = req.body;
    var hash = bcrypt.hashSync(password, 10);
    
    database.transaction(trx => {
        trx.insert({
            hash:   hash,
            email:  email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
            trx("users").returning("*")
            .insert({
                username:   username,
                email:      loginEmail[0],
                joined:     new Date()
            })
            .then(user => { resp.json(user) })
        })
        .then(trx.commit)
        .catch(trx.rollback);  
    }).catch(() => resp.status(400).json("Unable to register."));;
});


app.get("/profile/:id", (req, resp) => {
    const { id } = req.params;

    database.select("*").from("users").where( { id: id })
    .then(user => {
        if (user.length) {
            resp.json(user[0])
        } else {
            resp.status(400).json("Not found");
        }
    });
});


app.put("/image", (req, resp) => {
    const { id } = req.body;
    
    database("users").where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
        resp.json(entries[0]);
    })
    .catch(() => resp.status(400).json("Error while trying to do the operation on db."));
});


app.listen(3000, () => {
    console.log("App is running on port 3000.");
});
