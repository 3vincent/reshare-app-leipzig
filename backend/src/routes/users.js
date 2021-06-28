// const { query } = require('express')
const express = require('express')

const router = express.Router()

const Person = require('../models/person')
const Offer = require('../models/offer')
const Comment = require('../models/comment')

router.get('/', async (req, res) => {
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
})

router.get('/initialize', async (req, res) => {
  await Person.deleteMany({})
  await Offer.deleteMany({})
  await Comment.deleteMany({})

  const ginger = new Person({
    name: 'ginger39',
    givenName: 'Ginger Baker',
    email: 'ginger@baker.com',
    age: 80,
    location: ['Leipzig', '04229'],
    profilePhoto: '/img/avatar/user_avatar_ginger39.jpg',
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

  const gingersOfferId = await ginger.createOffer(gingersOffer)
  await armagan.leaveComment(gingersOfferId, 'These are great!!')

  // await ginger.likeOffer(gingersOffer)
  // await armagan.likeOffer(gingersOffer)

  // const gingersOffer2 = await Offer.create({
  //   title: 'Wash dishes',
  //   location: ['Leipzig', '04277'],
  //   photos: ['/img/offer-images/wash-dishes.jpg'],
  //   status: 'open',
  //   category: 'Services',
  //   description: 'My job is to do the dishes. I can help you clean if you need help 😉😉',
  // })
  // await ginger.createOffer(gingersOffer2)
  // await armagan.likeOffer(gingersOffer2)
  // await ginger.leaveComment(gingersOffer2, 'Awesome!!! 🙂')
  // setTimeout(async () => {
  //   await armagan.leaveComment(gingersOffer2, 'very nice')
  // }, 5000)

  // const armaganOffer = await Offer.create({
  //   title: 'Dish Washer',
  //   location: ['Berlin', '11234'],
  //   photos: ['/img/offer-images/dish-washer.jpg'],
  //   status: 'open',
  //   category: 'Electrical Devices',
  //   description: 'It is like new. Give it as-is.',
  // })
  // await armagan.createOffer(armaganOffer)
  // await ginger.likeOffer(armaganOffer)
  // await ginger.leaveComment(armaganOffer, 'This is a good dish washer')
  // await ginger.leaveComment(armaganOffer, 'Stil there?')
  // await armagan.leaveComment(armaganOffer, 'bump')

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
