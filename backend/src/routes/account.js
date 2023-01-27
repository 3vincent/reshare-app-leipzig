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
      givenName: Joi.string().optional().allow('').min(2).max(120),
      age: Joi.string(),
      email: Joi.string().email().required(),
      location: Joi.array().items(Joi.string()).required(),
      // profilePhoto: Joi.string(),
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

router.post('/session', (req, res, next) => {
  const { email, password } = req.body
  if (email === '') return res.status(400).send({ message: 'Email can not be empty!' })
  if (password === '') return res.status(400).send({ message: 'Password can not be empty!' })

  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err) // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(401).send({ message: 'Authentication failed!' })
    }

    req.login(user, e => {
      if (err) {
        return next(e)
      }
      return res.send(req.user)
    })
  })(req, res, next)
})

router.delete('/session', async (req, res, next) => {
  await req.logout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
