const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const commentSchema = new mongoose.Schema({
  creationTime: {
    type: Date,
    default: Date.now,
  },
  comment: String,
})

commentSchema.plugin(autopopulate)
module.exports = mongoose.model('Comment', commentSchema)
