const express = require("express");
const data = require("./data.json");

const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    console.log("Get request to / route.");
    // console.log("data:", data);
    // console.log("data.projects:", data.projects);
    res.locals.projects = data.projects;
    // console.log("projects:", projects);
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => console.log("App is running on port 3000..."));
