const express = require('express')

const router = express.Router()

const { offers } = require('../models/db')
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Leipzig Share App' })
})

module.exports = router
