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
      autopopulate: true,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
    },
  ],

  offers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
      autopopulate: true,
    },
  ],
})

class Person {
  async createOffer(offer) {
    this.offers.push(offer)
    await this.save()
    return offer
  }

  async likeOffer(offer) {
    this.likes.push(offer)
    offer.likedBy.push(this)

    await offer.save()
    await this.save()
  }

  // async leaveComment(offer, comment) {
  //   const newComment = new Comment(offer, this, comment)
  //   offer.comments.push(newComment)
  //   return newComment
  // }
}

personSchema.loadClass(Person)
personSchema.plugin(autopopulate)

module.exports = mongoose.model('Person', personSchema)
