const { query } = require('express')
const express = require('express')

const router = express.Router()

const { users } = require('../db')

/* GET home page. */

/* GET users listing. */
router.get('/', (req, res, next) => {
  let result = users

  if (req.query.name) {
    result = users.filter(user => user.name === req.query.name)
  }
  return res.send(result)
})

router.get('/:userID', (req, res, next) => {
  const user = users[req.params.userID]
  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router
