const express = require("express");

const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
    console.log("Get request to / route.");
    res.send("<h1>Home!!!</h1>");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => console.log("App is running on port 3000..."));
