const express = require('express')
const passport = require('passport')
const Person = require('../models/person')

const router = express.Router()

router.get('/session', (req, res) => {
  res.send(req.session)
})

router.post('/', async (req, res, next) => {
  const { name, givenName, age, email, location, profilePhoto, password } = req.body

  try {
    const user = await Person.register({ name, givenName, age, email, location, profilePhoto }, password)
    res.send(user)
  } catch (e) {
    console.log(e)
    next(e)
  }
})
module.exports = router
