const { Router } = require("express");
const {FullDataForSingleStat, SelectedStat} = require("../../models");

const router = new Router();

router.post("/:userid/addgamedata", (req, res) => {
    res.status(201).json({
        "message": "this is the good URL to send the statistics from the last game played by user:" + req.params.userid
    })
})

router.get("/:userid/:cardid/:duration?", (req, res) => {
    if(req.params.duration) {
        res.status(200).json({
            "message": "this is the way to acquire all 'FullDataForSingleStat' for a card, FOR A SPECIFIED DURATION OF " + req.params.duration
        })
    }
    else {
        res.status(200).json({
            "message": "this returns all 'FullDataForSingleStat' for a card, for all durations, in an array"
        })
    }
})

router.delete("/:userid/:cardid", (req, res) => {
    res.status(200).json({
        "message": "this deletes all stats saved for the card of id: " + req.params.cardid
    })
})

router.get("/:userid/:cardid/courbe/:stattype/:duree", (req, res) => {
    res.status(200).json({
        "message": "this returns courbe data asked with these parameters",
        ...req.params
    })
})

module.exports = router