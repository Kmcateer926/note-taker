
//1. Require Express
const express = require("express");
const fs = require("fs");
const { appendFile } = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

//2.Create Instance of Express

const app = express();

//3. Define the PORT
const PORT = process.env.PORT || 8080;

const notes =[{
    title: "Groceries",
    text: "Apples, Bananas, Cherries"
}]
//6. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Link CSS and JS
app.get("/assets/js/index.js", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

app.get("/assets/css/styles.css", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

//5. Add a route

    //View Routes
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API Routing  
    //GET ROUTE
    app.get("/api/notes", (req,res) => {
    fs.readFile("./db/db.json", (err,data) => {
        if (err) throw err;
        const previousNotes = JSON.parse(data);
        return res.json(previousNotes);
    });
});

    //POST ROUTE
app.post("/api/notes", (req,res) => {
    let previousNotes = fs.readFileSync("./db/db.json");
    req.body.id = uuidv4();
    previousNotes = JSON.parse(previousNotes);
    previousNotes.push(req.body);
    previousNotes=JSON.stringify(previousNotes);
    fs.writeFileSync("./db/db.json", previousNotes);
    previousNotes=JSON.parse(previousNotes);
    return res.json(previousNotes);
})

    //DELETE route
app.delete("/api/notes/:id", (req,res) => {
    let previousNotes = fs.readFileSync("./db/db.json");
    previousNotes = JSON.parse(previousNotes);
    previousNotes = previousNotes.filter(function(data){
        return data.id != req.params.id;
        });
    previousNotes = JSON.stringify(previousNotes);
    fs.writeFileSync("./db/db.json",previousNotes);
    previousNotes = JSON.parse(previousNotes);
    return res.send(previousNotes);
})

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//4. Listen on the port
app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});