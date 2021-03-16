const router = require('express').Router()

router.use('/api', require('./noteControllers.js'))
router.use('/', require('./viewControllers.js'))

module.exports = router