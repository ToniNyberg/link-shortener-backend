const express = require("express");
const router = express.Router();
const UrlVisit = require("../models/UrlVisit");
const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
    const urlCode = req.params.code
    const count = await UrlVisit.where({ 'urlCode': urlCode }).count();
    const url = await Url.findOne({ urlCode })
    const urlVisits = await UrlVisit.find({ 'urlCode': urlCode })
    const statisticsObject = {
            url: url,
            count: count,
            urlVisits: urlVisits
        }
    res.json(statisticsObject)
})

module.exports = router;