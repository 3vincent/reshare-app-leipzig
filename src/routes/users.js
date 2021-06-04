const { query } = require('express')
const express = require('express')

const router = express.Router()

const Person = require('../models/person')
const Offer = require('../models/offer')

const ben = new Person('ben', 'ben@someemail.com', 29, '', ['Leipzig', '04277'])
const armagan = new Person('armagan', 'armagan@someemail.com', 29, '', ['Berlin', '11234'])

const bensOffer = ben.createOffer(
  'My old pillbox hat',
  ['Leipzig', '04277'],
  'Clothing',
  'Giving this old THing away for free'
)
armagan.likeOffer(bensOffer)
ben.likeOffer(bensOffer)
armagan.leaveComment(bensOffer, 'Does it run with battery too?')

const bensOffer2 = ben.createOffer(
  'Wash dishes',
  ['Leipzig', '04277'],
  'Services',
  'My job is to do the dishes. I can help you clean if you need help'
)
armagan.likeOffer(bensOffer2)
armagan.leaveComment(bensOffer2, 'Awesome')
ben.leaveComment(bensOffer2, 'Thank you')
armagan.leaveComment(bensOffer2, 'test test')

const armaganOffer = armagan.createOffer(
  'Dish Washer',
  ['Berlin', '11234'],
  'Electrical Devices',
  'It is like new. Give it as-is.'
)
ben.likeOffer(armaganOffer)
ben.leaveComment(armaganOffer, 'This is a very good dish washer')
ben.leaveComment(armaganOffer, 'Again and again')
armagan.leaveComment(armaganOffer, 'Bump')

const users = [ben, armagan]

/* GET home page. */

/* GET users listing. */
router.get('/', (req, res, next) => {
  let result = users

  if (req.query.name) {
    result = users.filter(user => user.name === req.query.name)
    // ALT result = users.filter(user => user.name === req.query.name)
  }
  return res.send(result)
})

router.get('/:userID', (req, res, next) => {
  const user = users[req.params.userID]
  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router
