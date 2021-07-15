const { query } = require('express')
const express = require('express')

const router = express.Router()

const Comment = require('../models/comment')
const Person = require('../models/person')

router.get('/', async (req, res) => {
  const query = {}
  if (req.query.sender) {
    const query = await Person.find({ name: req.query.sender })
    if (query.length) res.send(await Comment.find({ sender: query[0]._id }))
    else res.sendStatus(400)
  } else {
    res.sendStatus(400)
  }
})

router.get('/:commentId', async (req, res) => {
  const comment = await Comment.findById(req.params.commentId)
  if (comment) res.send(comment)
  else res.sendStatus(400)
})

module.exports = router
