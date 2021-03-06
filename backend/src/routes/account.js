const express = require('express')
const passport = require('passport')
const Person = require('../models/person')

const { celebrate, Joi, errors, Segments } = require('celebrate')

const router = express.Router()

router.get('/session', (req, res) => {
  res.send(req.user)
})

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      givenName: Joi.string(),
      age: Joi.number(),
      email: Joi.string().email().required(),
      location: Joi.array().items(Joi.string()).required(),
      profilePhoto: Joi.string(),
      password: Joi.string().required(),
    },
  }),
  async (req, res, next) => {
    const { name, givenName, age, email, location, profilePhoto, password } = req.body

    try {
      const user = await Person.register({ name, givenName, age, email, location, profilePhoto }, password)
      res.send(user)
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
)

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.user)
})

router.delete('/session', async (req, res, next) => {
  await req.logout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
