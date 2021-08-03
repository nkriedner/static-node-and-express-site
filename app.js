// ******************************
// SET UP EXPRESS AND IMPORT DATA
// ******************************
const express = require("express");
const data = require("./data.json");

const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

// ******
// ROUTES
// ******
app.get("/", (req, res) => {
    res.locals.projects = data.projects;
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/project/:id", (req, res, next) => {
    res.locals.projects = data.projects;
    const id = parseInt(req.params.id);

    if (data.projects[id] != undefined) {
        res.render("project", { id });
    } else {
        console.log("ERROR: This project id does not exist");
        const error = new Error();
        error.status = 404;
        error.message = "Sorry, but this project does not exist.";
        next(error);
    }
});

app.get("/error", (req, res) => {
    console.log("Custom sample /error route called");
    const error = new Error();
    error.message = "Custom 500 error thrown";
    error.status = 500;
    throw error;
});

// *************************
// ERROR HANDLING MIDDLEWARE
// *************************
app.use((req, res, next) => {
    console.error("404 error handler called...");
    const err = new Error();
    err.status = 404;
    err.message = "Looks like this page does not exist...";
    next(err);
});

app.use((err, req, res, next) => {
    console.error("Global error handler called");
    if (err.status === 404) {
        res.status(404).render("page-not-found", { err });
    } else {
        err.message = err.message || "Something went wrong on the server";
        res.status(err.status || 500).render("error", { err });
    }
});

// ******************
// MAKE SERVER LISTEN
// ******************
app.listen(process.env.PORT || 3000, () =>
    console.log("App is running on port 3000.")
);
