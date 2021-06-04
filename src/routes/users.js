const { query } = require('express')
const express = require('express')

const router = express.Router()

const Person = require('../models/person')

const ben = new Person('ben', 'ben@someemail.com', 29, '', ['Leipzig', '04277'])
const armagan = new Person('armagan', 'armagan@someemail.com', 29, '', ['Berlin', '11234'])

const users = [ben, armagan]

/* GET home page. */

/* GET users listing. */
router.get('/', (req, res, next) => {
  let result = users

  if (req.query.name) {
    result = users.find(user => user.name === req.query.name)
  }
  return res.send(result)
})

router.get('/:userID', (req, res, next) => {
  const user = users[req.params.userID]
  if (user) res.send(user)
  else res.sendStatus(404)
})

module.exports = router
