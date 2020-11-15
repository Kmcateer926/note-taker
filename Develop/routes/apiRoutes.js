// API ROUTES
app.get("/api/notes", (req, res) => {
  res.json({
    notes: notes,
  });
});

app.post("/api/notes", (req, res) => {});
