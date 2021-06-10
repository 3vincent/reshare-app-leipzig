const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const offerSchema = new mongoose.Schema({
  title: String,
  location: [],
  category: String,
  description: String,
  photos: [],
  creationTime: Date, // Date.now()
  duration: Number, //  4 * 7 * 24 * 60 * 60
  offerUUID: String, // uuidv4(),
  status: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      autopopulate: true,
    },
  ],
  comments: [],
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
