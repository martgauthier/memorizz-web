const { Router } = require('express')

const usersRouter = require('./users')
const StatsRouter = require("./stats")



const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/users', usersRouter)
router.use("/stats", StatsRouter);

module.exports = router
