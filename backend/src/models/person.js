const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

// const Offer = require('./offer')
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
        maxDepth: 2,
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
    const newComment = await Comment.create({ comment, sender: this })
    offer.comments.push(newComment)
    this.comments.push(newComment)

    await offer.save()
    // await newComment.save()
    await this.save()
  }
}

personSchema.loadClass(Person)
personSchema.plugin(autopopulate)

module.exports = mongoose.model('Person', personSchema)
