// FILE FOR READ, WRITE, DELETE METHODS
const fs = require("fs");

const dbPath = "db/db.json";

// function to read saved notes from db.json
const readData = () => {
  const data = fs.readFileSync(dbPath, "utf8");

  const notes = JSON.parse(data);

  return notes;
};

// function to write saved notes to db.json
const writeData = (info) => {
  fs.writeFileSync(dbPath, JSON.stringify(info));
};

module.exports = { readData, writeData };