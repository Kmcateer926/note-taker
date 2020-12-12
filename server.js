
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
app.use(express.static(path.join(__dirname, "Develop/public")));
  

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


//POST 
app.post("/api/notes", (req, res) => {

    var newNote = req.body;
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            allNotes = JSON.parse(data);
            if (newNote.id || newNote.id === 0) {
                let currNote = allNotes[newNote.id];
                currNote.title = newNote.title;
                currNote.text = newNote.text;
            } else {
                allNotes.push(newNote);
            }
            writefileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
                .then(function () {
                    console.log("Wrote db.json");
                })
        });
    res.json(newNote);
});
    // fs.readFile("./db/db.json", "utf-8", (err, data) => {
    //   if (err) {
    //     throw err;
    //   } else {
    //     notesData = JSON.parse(data);
    //     const newNote = { ...req.body, id: notesData.length };
    //     console.log(newNote);
    //     console.log(notesData);
    //     notesData.push(newNote);
    //     fs.writeFile("./db/db.json", JSON.stringify(notesData), "utf-8", (err) => {
    //       if (err) {
    //         throw err;
    //       } else {
    //         return res.json(notesData);
    //       }
    //     });
    //   }
    // });
//   });
    //DELETE 
app.delete("/api/notes/:id", (req,res) => {
    let savedNotes = fs.readFileSync("./db/db.json");
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
// 4. Listen on the port
app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});