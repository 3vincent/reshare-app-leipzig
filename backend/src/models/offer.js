const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const uuidv4 = require('../lib/uuid-func')

const offerSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    autopopulate: {
      maxDepth: 1,
    },
  },
  title: String,
  location: [],
  category: String,
  description: String,
  photos: {
    type: Array,
    default: ['/img/offer-images/placeholder-view-vector.svg'],
    // CC License Image, source: https://commons.wikimedia.org/wiki/File:Placeholder_view_vector.svg by https://commons.wikimedia.org/wiki/User:Flanoz
  },
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
    default: uuidv4, // mocks a unique offer ID
  },
  status: {
    type: String,
    default: 'open',
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
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
