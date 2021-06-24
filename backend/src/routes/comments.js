const { query } = require('express')
const express = require('express')

const router = express.Router()

const Comment = require('../models/comment')

/* GET home page. */

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.sender.name) {
    query.sender.name = req.query.sender.name
  }

  res.send(await Comment.find(query))
})

router.get('/:commentId', async (req, res) => {
  const comment = await Comment.findById(req.params.commentId)
  if (comment) res.send(comment)
  else res.sendStatus(404)
})

module.exports = router
