// controllers/wilders.js
const WilderModel = require("../models/Wilder")

module.exports = {
  create: async (req, res, next) => {
      await WilderModel.init()
      const wilder = new WilderModel(req.body)
      const result = await wilder.save()
      res.json({ success: true, result})
  },
  retrieve: async (req, res) => {
    const result = await WilderModel.find()
    if (!result) res.json({ success: false, result: "No wilders found"})
    res.json({ sucess: true, result: result })
  },
  update: async (req, res) => {
    const result = await WilderModel.updateOne({ _id: req.body._id }, req.body)
    if (!result) res.json({ success: false, result: "No such wilder exists" })
    res.send({ success: true, result: result })
  },
  delete: (req, res) => {
    WilderModel.deleteOne({ _id: req.body._id})
    .then(result => {
        if (!result) res.json({ success: false, result: "No wilder with such ID was found" })
        res.json({ success: true, result: result })
    })
    .catch(err => res.json({success: false, result: err}))
  }
}