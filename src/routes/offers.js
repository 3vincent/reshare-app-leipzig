const { query } = require('express')
const express = require('express')

const router = express.Router()

const Offer = require('../models/offer')

/* GET home page. */

/* GET users listing. */
router.get('/', (req, res) => {
  let result = Offer

  if (req.query.name) {
    result = Offer.filter(offer => offer.name === req.query.name)
  }
  return res.send(result)
})

router.get('/:offerID', (req, res) => {
  const offer = Offer[req.params.offerID]
  if (offer) res.render('offer', { offer })
  else res.sendStatus(404)
})

module.exports = router
