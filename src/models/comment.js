const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const commentSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    autopopulate: true,
  },
  creationTime: Date,
  comment: String,
})

commentSchema.plugin(autopopulate)
module.exports = mongoose.model('Comment', commentSchema)
