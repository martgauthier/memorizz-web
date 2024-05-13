const { Router } = require('express')
const StatsRouter = require("./stats")

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))

router.use("/stats", StatsRouter);

module.exports = router