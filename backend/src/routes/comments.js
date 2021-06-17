const { query } = require('express')
const express = require('express')

const router = express.Router()

const Comment = require('../models/comment')

/* GET home page. */

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.status) {
    query.status = req.query.status
  }

  if (req.query.category) {
    query.category = req.query.category
  }

  if (req.query.location) {
    query.location = req.query.location
    // search in an array like this:
    // http://leipzigsharing.localhost/api/offers?location=Berlin&location=11234
    // express automatically iterates through the values
    // so this is also possible:
    // http://leipzigsharing.localhost/api/offers?location=Leipzig
    // Source https://stackoverflow.com/a/33086861
  }
  res.send(await Comment.find(query))
})

// router.get('/:commentID', (req, res) => {
//   const comment = Comment[req.params.commentID]
//   if (comment) res.render('comment', { comment })
//   else res.sendStatus(404)
// })

module.exports = router
