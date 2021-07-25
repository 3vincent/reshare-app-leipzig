const { query } = require('express')
const express = require('express')
const router = express.Router()

const sentimentAnalysis = require('../lib/sentiment-analysis')

const { celebrate, Joi, errors, Segments } = require('celebrate')

const Offer = require('../models/offer')
const Comment = require('../models/comment')

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

router.post(
  '/:offerId/comment',
  celebrate({
    [Segments.PARAMS]: {
      offerId: Joi.string().required(),
    },
    [Segments.BODY]: {
      comment: Joi.string().required(),
      offer: Joi.string().required(),
    },
  }),
  async (req, res) => {
    if (req.body.offer !== req.params.offerId) throw new Error('This comment does not belong to this offer!')

    const offer = await Offer.findById(req.body.offer)
    const comment = req.body.comment
    const sender = req.user
    const classification = await sentimentAnalysis(comment)

    const newComment = await Comment.create({ offer, classification, comment, sender })
    offer.comments.push(newComment)

    await offer.save()

    res.sendStatus(200)
  }
)

router.post(
  '/:offerId/like',
  celebrate({
    [Segments.PARAMS]: {
      offerId: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const sender = req.user
    const offer = await Offer.findById(req.params.offerId)

    await sender.likeOffer(offer)
    res.sendStatus(200)
  }
)

router.post(
  '/:offerId/save',
  celebrate({
    [Segments.PARAMS]: {
      offerId: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const sender = req.user
    const offer = await Offer.findById(req.params.offerId)

    await sender.saveOffer(offer)
    res.sendStatus(200)
  }
)

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
