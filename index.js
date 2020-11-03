// index.js
const express = require('express');
const mongoose = require("mongoose")
const app = express();
const wildController = require("./controllers/wilders")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/wilderdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true
})
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.post("/api/wilder/create", wildController.create)

app.get("/api/wilder/retrieve", wildController.retrieve)

app.put("/api/wilder/update", wildController.update)

app.delete("/api/wilder/delete", wildController.delete)

app.listen(8000, () => console.log("Server started on port 8000"))