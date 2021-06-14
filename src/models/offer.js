const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const uuidv4 = require('../lib/uuid-func')

const offerSchema = new mongoose.Schema({
  owner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  title: String,
  location: [],
  category: String,
  description: String,
  photos: [],
  creationTime: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    default: 4 * 7 * 24 * 60 * 60,
  },
  offerUUID: {
    type: String,
    default: uuidv4, // will be replaced with a mongoID soon
  },
  status: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      autopopulate: {
        maxDepth: 2,
      },
    },
  ],
})

class Offer {
  expire() {
    const age = Date.now() - this.creationTime
    if (age > this.duration) {
      this.status = 'expired' // make distinction between expired, withdrawn or taken
    }
  }

  get commenters() {
    return this.comments.map(comment => comment.sender)
  }
}

offerSchema.loadClass(Offer)
offerSchema.plugin(autopopulate)

module.exports = mongoose.model('Offer', offerSchema)
