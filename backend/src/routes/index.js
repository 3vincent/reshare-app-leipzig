const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('index', { title: 'Leipzig Sharing App API' })
})

module.exports = router
