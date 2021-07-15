const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const commentSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
  },
  classification: {
    type: Object,
  },
})

commentSchema.plugin(autopopulate)
module.exports = mongoose.model('Comment', commentSchema)
