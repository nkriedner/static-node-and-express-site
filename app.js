const express = require("express");
const data = require("./data.json");

const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    console.log("Get request to / route.");
    res.locals.projects = data.projects;
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/project/:id", (req, res) => {
    res.locals.projects = data.projects;
    const id = parseInt(req.params.id);
    console.log("id:", id);
    console.log("typeof id:", typeof id);
    console.log("data.projects[id]:", data.projects[id]);
    // Check if id is a number AND not smaller or larger than the length of the projects array
    // if (isNaN(req.params.id)) {
    //     next();
    //     // res.redirect("/project/0");
    // }
    if (data.projects[id] != undefined) {
        res.render("project", { id });
    } else {
        console.log("ERRRRRRRROOORR!!!!");
        const err = new Error();
        err.status = 404;
        err.message = "Sorry, but this project does not exist.";
        next(err);
    }
    // res.send("<h1>Project " + id + "</h1>");
});

app.use((req, res, next) => {
    // const err = new Error("Not Found");
    // err.status = 404;
    // next(err);
    res.status(404).res.render("page-not-found");
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).res.render("page-not-found");
    } else {
        err.message = err.message || "Something went wrong on the server";
        res.status(err.status || 500).render("error", { err });
    }
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
});

app.listen(3000, () => console.log("App is running on port 3000..."));
