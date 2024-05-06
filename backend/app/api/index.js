const { Router } = require('express')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))

router.get("gauthier", (req, res) => {

});

module.exports = router
