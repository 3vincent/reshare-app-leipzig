const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const Offer = require('./offer')
const Comment = require('./comment')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  eMailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profilePhoto: {
    type: String,
  },
  location: [],
  savedOffers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  offers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
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
        maxDepth: 1,
      },
    },
  ],
})

class Person {
  async createOffer(offer) {
    this.offers.push(offer)
    offer.owner.push(this)
    await this.save()
    await offer.save()
    return offer
  }

  async likeOffer(offer) {
    this.likes.push(offer)
    offer.likedBy.push(this)

    await offer.save()
    await this.save()
  }

  async leaveComment(offer, comment) {
    offer.comments.push(comment)
    comment.sender.push(this)
    this.comments.push(comment)

    await this.save()
    await comment.save()
    await offer.save()
  }
}

personSchema.loadClass(Person)
personSchema.plugin(autopopulate)

module.exports = mongoose.model('Person', personSchema)
