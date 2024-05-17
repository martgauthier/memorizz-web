const { Router } = require('express')
const StatsRouter = require('./stats')
const UsersRouter = require('./users')
const { Identification } = require('../models/user')


const router = new Router()

router.get('/status', (req, res) => res.status(200).json('ok'))

router.get('/users', (req, res) => {
  res.status(200).json(Identification.get())
})


router.use('/stats', StatsRouter)
router.use('/users', UsersRouter)
module.exports = router
