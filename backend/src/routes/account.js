const express = require('express')

const router = express.Router()

router.get('/session', async (req, res) => {
  res.send(req.sessions)
})

module.exports = router
