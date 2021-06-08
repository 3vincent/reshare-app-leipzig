const express = require('express')

const router = express.Router()

const { offers } = require('../models/db')

router.get('/', (req, res) => {
  res.render('index', { title: 'Leipzig Share App' })

  // return as object EXAMPLE:
  //  res.send({
  //   message: 'hello',
  // })
})

module.exports = router
