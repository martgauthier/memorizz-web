const { Router } = require("express");
const {FullDataForSingleStat, SelectedStat} = require("../../models");

const router = new Router();

router.get("/", (req, res) => {
    res.status(200).json(SelectedStat.get())
})

router.post("/", (req, res) => {
    SelectedStat.create({...req.body})
    res.status(201).end()
})

module.exports = router