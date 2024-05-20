const { Router } = require("express");
const {FullDataForSingleStat, SelectedStat} = require("../../models");
const {respondWithCardStat, respondWithGameStat} = require("./manager");

const router = new Router();

router.post("/:userid/addgamedata", (req, res) => {
    res.status(201).json({
        "message": "this is the good URL to send the statistics from the last game played by user:" + req.params.userid,
        ...req.body
    })
})

router.get("/:userid/fullgames", (req, res) => {
    if(req.query.duration && req.query.stattype) {
        respondWithGameStat(res, req.params.userid, req.query.stattype, req.query.duration)
    }
    else {
        res.status(400).json({
            "message": "You're missing duration or stattype query argument !!"
        })
    }
})


router.get("/:userid/:cardid", (req, res) => {
    if(req.query.duration && req.query.stattype) {
        respondWithCardStat(res, req.params.userid, req.params.cardid, req.query.stattype, req.query.duration)
    }
    else {
        res.status(400).json({
            "message": "You're missing duration or stattype query argument !!"
        })
    }
})

router.delete("/:userid/:cardid", (req, res) => {
    res.status(200).json({
        "message": "this deletes all stats saved for the card of id: " + req.params.cardid
    })
})

router.get("/:userid/:cardid/courbe", (req, res) => {
    if(!req.query.stattype || !req.query.duration) {
        res.status(400).json({
            "message": "You're missing ?stattype or ?duration query parameter !!"
        })
    }

    res.status(200).json({
        "message": "this returns courbe data asked with these parameters",
        ...req.params,
        ...req.query
    })
})

module.exports = router