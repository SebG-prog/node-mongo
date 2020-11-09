// index.js
const express = require('express');
const mongoose = require("mongoose")
const app = express();
const wildController = require("./controllers/wilders");
const asyncHandler = require('express-async-handler');
const createError = require('http-errors')

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

app.post("/api/wilders", asyncHandler(wildController.create))

app.get("/api/wilders", asyncHandler(wildController.retrieve))

app.put("/api/wilder/:_id", asyncHandler(wildController.update))

app.delete("/api/wilder/:_id", asyncHandler(wildController.delete))

app.use((req, res, next) => {
  next(createError(404, "There is nothing there"))
})

app.use((error, req, res, next) => {
  if (error.name === 'MongoError' || error.code === 11000) {
    res.status(400)
    error.message =  "Named already used in DB"
  }

  res.status(error.status || 500)
  res.json({ success: false, message: error.message, stack: error.stack})
})

app.listen(8000, () => console.log("Server started on port 8000"))