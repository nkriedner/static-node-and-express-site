const express = require("express");
const projectData = require("./data.json");

const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("Get request to / route.");
    console.log("projectData:", projectData);
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => console.log("App is running on port 3000..."));
