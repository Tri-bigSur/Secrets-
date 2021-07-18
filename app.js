//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const userSchema = {
    email: String,
    password: String
}
const User = new mongoose.model("User", userSchema)
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("home");

});
app.get("/login", function (req, res) {
    res.render("login");

});
app.get("/register", function (req, res) {
    res.render("register");
});
app.post("/register", function (req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })
    newUser.save(function (err) {
        if (err) {
            console.log(err)
        } else {
            res.render("secrets")
        }
    });
});
app.post("/login", function (req, res) {
    const userName = req.body.username;
    const password = req.body.password;
    User.findOne(
        { email: userName },
        function (err, foundUser) {
            if (err) {
                console.log(err)
            } else {
                if (foundUser) {
                    if (foundUser.password === password) {
                        res.render("secrets")
                    }else{
                        res.send("User Invalid")
                    }
                }
            }
        });

});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});