const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortId");
const config = require("config");

const Url = require("../models/Url");

router.post("/shorten", async (req, res) => {
    const {longUrl} = req.body;

    const baseUrl = config.get("baseUrl")

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("not a valid url")
    }

    const urlCode = shortId.generate();

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl })
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + "/" + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                
                res.json(url);
            }
        } catch(err) {
          console.error(err);
          res.status(500).json("server error");  
        }
    } else {
      res.status(401).json("invalid url")  
    }
})

router.get("/getAll", async (req, res) => {
    try{
        const data = await Url.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete("/:code", async (req, res) => {
    const urlCode = req.params.code
    
    try {
        await Url.deleteOne( { urlCode: urlCode })
            res.json("delete successful")
        } catch (error) {
            console.log('Could not delete')
        }
    }
)

module.exports = router;