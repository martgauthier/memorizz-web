const { Router } = require('express')
const cardsRouter = require('./cards')
const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/cards', UserRouter)
module.exports = router
