const express = require('express')

const router = express.Router()

const Offer = require('../models/offer')

const Person = require('../models/person')

router.get('/', async (req, res) => {
  const offers = await Offer.find({})
  const persons = await Person.find({})
  res.render('index', { title: 'Leipzig Share App', offers, persons })
})

module.exports = router
