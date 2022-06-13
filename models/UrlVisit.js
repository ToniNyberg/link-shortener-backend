const mongoose = require("mongoose")

const urlVisitSchema = new mongoose.Schema({
    urlCode: String,
    date: {type: String, default: Date.now}
})

module.exports = mongoose.model("UrlVisit", urlVisitSchema)