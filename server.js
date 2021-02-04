const { json } = require("express");
const express = require("express");
const { fstat } = require("fs");
const path = require("path");
const fs = require("fs");
let notes = require("./db/db.json");
const { dirname } = require("path");
bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

// create instance of express
const app = express();

let notesArray = [
  {
    id: 1,
    message: "First reminder of the day!",
  },
];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());

// Routes to get back the HTML Files
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// HTML VIEWS ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API ROUTES
app.get("/api/notes", (req, res) => {
  // read file

  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json(JSON.parse(data));
    }
  });
  // return res.json(notes)
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      notesArray = JSON.parse(data);
      const newNote = { ...req.body, id: notesArray.length };
      console.log(newNote);
      console.log(notesArray);
      notesArray.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(notesArray), "utf-8", (err) => {
        if (err) {
          throw err;
        } else {
          return res.json(notesArray);
        }
      });
    }
  });
});

app.delete("/api/notes/:id", function (req, res) {
  const chosen = req.params.id;
  const newNotes = notes.filter((note) => note.id != chosen);

  if (!newNotes) {
    response.status(500).send("Notes not found.");
  } else {
    notes = newNotes;
    //   response.send(notes);
  }
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      throw err;
    } else {
      res.json(chosen);
    }

    console.log(chosen);
  });
});

// listen on the port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

