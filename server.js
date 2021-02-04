const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const notesArray = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/views/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/views/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/api/config", (req, res) => {
  return res.json({
    success: true,
  });
});

app.get("/api/notes", (req, res) => {
  return res.json(
    JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json")))
  );
});

app.get("/api/notes:id", (req, res) => {
  res.json(data, req.params.id);
});

app.post("/api/notes", (req, res) => {
  let createNewNote = req.body;

  createNewNote.id = uuidv4();

  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );

  notes.push(createNewNote);

  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes));

  return res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);

  const theNotes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );

  let notesNotToDelete = theNotes.filter((note) => note.id !== id);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesNotToDelete));

  return res.json(notesNotToDelete);
});
