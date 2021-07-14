const { query } = require('express')
const express = require('express')
const router = express.Router()

const axios = require('axios')

const { celebrate, Joi, errors, Segments } = require('celebrate')

const Offer = require('../models/offer')
const Person = require('../models/person')
const Comment = require('../models/comment')

const APITokenMonkey = process.env.MONKEYLEARNAPITOKEN

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

async function checkCommentLanguage(text) {
  // API from here https://app.monkeylearn.com/
  const headers = {
    'Content-Type': 'application/json',
    Authorization: APITokenMonkey,
  }
  const data = {
    data: [text],
  }

  return await axios({
    method: 'post',
    headers: headers,
    url: 'https://api.monkeylearn.com/v3/classifiers/cl_pi3C7JiL/classify/',
    data,
  }).then(
    response => {
      console.log(response)
      return response.data[0].classifications[0]
    },
    error => {
      console.log(error)
    }
  )
}

router.post(
  '/:offerId/comment',
  celebrate({
    [Segments.PARAMS]: {
      offerId: Joi.string().required(),
    },
    // [Segments.BODY]: {
    //   comment: Joi.string().required(),
    //   offer: Joi.string().required(),
    //   sender: Joi.string().required(),
    // },
  }),
  async (req, res) => {
    if (req.body.offer !== req.params.offerId) throw new Error('This comment does not belong to this offer!')
    const offer = await Offer.findById(req.body.offer)
    const comment = req.body.comment
    let classification = {
      tag_name: 'neutral',
      tag_id: 0,
      confidence: 0,
    }
    const sender = await Person.findById(req.body.sender)

    if (APITokenMonkey) {
      classification = await checkCommentLanguage(comment)
    }

    const newComment = await Comment.create({ offer, classification, comment, sender })
    offer.comments.push(newComment)

    await offer.save()

    // to user class-method, do:
    // await sender.leaveComment(offer, comment, classification)
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
