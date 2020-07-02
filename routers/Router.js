const router = require('express').Router()

router.use(`/user`, require('./user'))
router.use(`/host`, require('./host'))

module.exports = router
