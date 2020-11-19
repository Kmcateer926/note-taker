const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// VIEWS ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
