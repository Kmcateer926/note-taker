
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

//  Initialize notesData
let notesData = [];

//6. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//5. Add a route
// app.get("/api/config", (req,res) =>{
//     res.send("My config object will go here");
// });

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Added a test note to see notes
app.get("/api/notes", (req,res) => {
    fs.readFile("./db/db.json",(err,data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        return res.json(savedNotes);
    });
});

//POST 
app.post("/api/notes", (req,res) => {
    let savedNotes = fs.readFileSync("./db/db.json");
    req.body.id = uuidv4();
    savedNotes = JSON.parse(savedNotes);
    savedNotes.push(req.body);
    savedNotes=JSON.stringify(savedNotes);
    fs.writeFileSync("./db/db.json", savedNotes);
    savedNotes=JSON.parse(savedNotes);
    return res.json(savedNotes);
})

    //DELETE 
app.delete("/api/notes/:id", (req,res) => {
    let previousNotes = fs.readFileSync("./db/db.json");
    savedNotes = JSON.parse(savedNotes);
    savedNotes = savedNotes.filter(function(data){
        return data.id != req.params.id;
        });
        savedNotes = JSON.stringify(savedNotes);
    fs.writeFileSync("./db/db.json", savedNotes);
    savedNotes = JSON.parse(savedNotes);
    return res.send(savedNotes);
})


app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
//4. Listen on the port
app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});