const express       = require("express");
const bcrypt        = require('bcryptjs');
const cors          = require("cors");
const knex          = require("knex");
const app_passwords = require("./my_passwords");
const { response } = require("express");


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

const databaseTemp = {
    users: [
        {
            id:         "123",
            username:   "John",
            email:      "john@gmail.com",
            password:   "$2a$10$cPfElAngdytPFvPvIn1JueYbU5IWsfbymidNf8/UNPDV.6U8Z1ewK", //  john123
            entries:    0,
            joined:     new Date(),
        },
        {
            id:         "124",
            username:   "Liza",
            password:   "$2a$10$RH2bdExOgs9.2uG4qCNWa.ipxD5RN3getuGt50N/58VkgQLr0Uple", //  liza123
            email:      "liza@gmail.com",
            entries:    0,
            joined:     new Date(),
        }
    ],
    login: [
        {
            id:     "978",
            has:    "",
            email:  "john@gmail.com",
        },
    ]
}

app.get("/", (req, resp) => {
    resp.send(databaseTemp.users);
});

app.post("/signin", (req, resp) => {
    const { email, password } = req.body;
    const userCheck = databaseTemp.users.filter(user => (user.email === email) && (bcrypt.compareSync(password, user.password)));

    return (userCheck.length > 0) ? resp.json(userCheck[0]) : resp.status(400).json("Error loggin in!");
});

app.post("/register", (req, resp) => {
    const { email, username, password } = req.body;
    var hash = bcrypt.hashSync(password, 10);

    database("users")
    .returning("*")
    .insert({ 
        username:   username,
        email:      email,
        joined:     new Date()
    })
    .then(user => { resp.json(user) })
    .catch(resp.status(400).json("Unable to register."));
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
    let found = false;

    databaseTemp.users.forEach (user => {
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