const express       = require("express");
const bcrypt        = require('bcryptjs');
const cors          = require("cors");
const knex          = require("knex");
const register      = require("./controllers/resgister");
const signin        = require("./controllers/signin");
const profile       = require("./controllers/profile");
const image         = require("./controllers/image");


// Database connection settings
const database = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        port: 5432,
        password: `${process.env.POSTGRES_PASSWORD}`,
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
const PORT = process.env.PORT;

app.get("/", (req, resp) => { resp.send(database.select("*").from("users")) });

app.post("/signin", (req, resp) => { signin.handleSignIn(req, resp, database, bcrypt) });

app.post("/register", (req, resp) => { register.handleRegister(req, resp, database, bcrypt) });

app.get("/profile/:id", (req, resp) => { profile.handleProfileGet(req, resp, database) });

app.put("/image", (req, resp) => { image.handleImage(req, resp, database) });
app.post("/image-detect", (req, resp) => { image.handleFaceDetectionAPICall(req, resp) });


app.listen(PORT, () => {
    console.log(process.env);
    console.log(`App is running on port ${PORT}.`);
});
