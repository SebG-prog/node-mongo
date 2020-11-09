// controllers/wilders.js
const createError = require("http-errors")

const WilderModel = require("../models/Wilder")

const wildController = {
  create: async (req, res, next) => {
      await WilderModel.init()
      const wilder = new WilderModel(req.body)
      const result = await wilder.save()
      res.json({ success: true, result})
  },
  retrieve: async (req, res) => {
    const result = await WilderModel.find()
    if (!result[0]) throw createError(400, "No wilders found")
    res.json({ sucess: true, result: result })
  },
  update: async (req, res) => {
    const result = await WilderModel.updateOne({ _id: req.params._id }, req.body)
    if (!result.n) throw createError(400, "No such wilder exists")
    res.send({ success: true, result: result })
  },
  delete: (req, res) => {
    WilderModel.deleteOne({ _id: req.params._id})
    .then(result => {
      if (!result.n) throw createError(400, "No wilder with such ID was found")
      res.json({ success: true, result: result })
    })
  }
}

module.exports = wildController