const express = require('express')

const router = express.Router()

const Offer = require('../models/offer')

router.get('/', async (req, res) => {
  const offers = await Offer.find({})
  res.render('index', { title: 'Leipzig Share App', offers })
})

module.exports = router
