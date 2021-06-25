const express = require('express')

const router = express.Router()

router.get('/session', (req, res) => {
  res.send(req.session)
})

module.exports = router
