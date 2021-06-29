const { query } = require('express')
const express = require('express')

const router = express.Router()

const Offer = require('../models/offer')
const Person = require('../models/person')

router.get('/', async (req, res) => {
  const query = {}

  if (req.query.status) {
    query.status = req.query.status
  }

  if (req.query.category) {
    query.category = req.query.category
  }

  if (req.query.location) {
    query.location = req.query.location
    // search in an array like this:
    // http://leipzigsharing.localhost/api/offers?location=Berlin&location=11234
    // express automatically iterates through the values
    // so this is also possible:
    // http://leipzigsharing.localhost/api/offers?location=Leipzig
    // Source https://stackoverflow.com/a/33086861
  }

  res.send(await Offer.find(query))
})

router.post('/:offerId/comment', async (req, res) => {
  const sender = req.user
  const offer = await Offer.findById(req.params.offerId)
  const commentText = req.body.comment

  const comment = await sender.leaveComment(offer, commentText)

  res.send(comment)
})

router.post('/:offerId/like', async (req, res) => {
  const sender = req.user
  const offer = await Offer.findById(req.params.offerId)

  const like = await sender.likeOffer(offer)

  res.send(like)
})

router.post('/:offerId/save', async (req, res) => {
  const sender = req.user
  const offer = await Offer.findById(req.params.offerId)

  const save = await sender.saveOffer(offer)

  res.send(save)
})

router.get('/:offerId', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerId)
    if (offer) res.send(offer)
    else res.sendStatus(404)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
