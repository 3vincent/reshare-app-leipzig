// const { query } = require('express')
const express = require('express')

const router = express.Router()

const { celebrate, Joi, errors, Segments } = require('celebrate')

const Person = require('../models/person')
const Offer = require('../models/offer')
const Comment = require('../models/comment')

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      age: Joi.number(),
      location: Joi.array().items(Joi.string()),
    },
  }),
  async (req, res) => {
    const query = {}

    if (req.query.name) {
      query.name = req.query.name
    }

    if (req.query.age) {
      query.age = req.query.age
    }

    if (req.query.location) {
      query.location = req.query.location
    }

    res.send(await Person.find(query))
  }
)

router.get('/initialize', async (req, res) => {
  await Person.deleteMany({})
  await Offer.deleteMany({})
  await Comment.deleteMany({})

  const ginger = new Person({
    name: 'baker39',
    givenName: 'Ginger Baker',
    email: 'ginger@baker.com',
    age: 80,
    location: ['Leipzig', '04229'],
  })
  await ginger.setPassword('test')
  await ginger.save()

  const armagan = new Person({
    name: 'Armagan',
    givenName: 'Armagan',
    email: 'armagan@someemail.com',
    age: 29,
    location: ['Berlin', '11234'],
  })
  await armagan.setPassword('test')
  await armagan.save()

  const zach = new Person({
    name: 'zach-is-online',
    givenName: 'Zach Hill',
    email: 'zach@hill.com',
    age: 41,
    location: ['Leipzig', '04177'],
  })
  await zach.setPassword('test')
  await zach.save()

  const gingersOffer = {
    title: 'My Vue.JS socks',
    location: ['Leipzig', '04277'],
    photos: ['/img/offer-images/socks.jpg'],
    status: 'open',
    category: 'Clothing',
    description: 'Like new, never worn.',
  }

  await ginger.createOffer(gingersOffer)

  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  try {
    const person = await Person.findById(req.params.userId)
    if (person) res.send(person)
    else res.sendStatus(404)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// This could be used to show users like website.com/users/ben
// Together with the above route handler /:userID it could work with both, /users/ben and /users/someId34-092-3e3/json
// But for now, I'll comment this part out
//
// router.get('/:userId/json', async (req, res) => {
//   try {
//     const person = await Person.findById(req.params.userId)
//     res.send(person)
//   } catch (err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// })

// router.get('/:name', async (req, res) => {
//   try {
//     const person = await Person.find({ name: req.params.name })
//     if (person) res.send(person)
//     else res.sendStatus(404)
//   } catch (err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// })

module.exports = router
