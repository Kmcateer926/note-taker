const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  });
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/notes.html"));
  });

  app.get("/api/notes", (req, res) => {
    res.json({
      notes: notes,
    });
  });
  
  app.post("/api/notes", (req, res) => {
      
  })

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });