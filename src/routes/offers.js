const { query } = require('express')
const express = require('express')

const router = express.Router()

const { offers } = require('../models/db')

/* GET home page. */

/* GET users listing. */
router.get('/', (req, res, next) => {
  let result = offers

  if (req.query.name) {
    result = offers.filter(offer => offer.name === req.query.name)
  }
  return res.send(result)
})

router.get('/:offerID', (req, res, next) => {
  const offer = offers[req.params.offerID]
  if (offer) res.render('offer', { offer })
  else res.sendStatus(404)
})

module.exports = router
