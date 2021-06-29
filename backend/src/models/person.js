const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const Offer = require('./offer')
const Comment = require('./comment')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  givenName: {
    type: String,
  },
  age: {
    type: Number,
  },
  profilePhoto: {
    type: String,
    default: '/img/avatar/default_user_avatar.png',
  },
  location: {
    type: Array,
    required: true,
  },
  savedOffers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
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
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

class Person {
  async createOffer(offer) {
    const newOffer = await Offer.create({ owner: this, ...offer })
    this.offers.push(newOffer)
    await this.save()
    await newOffer.save()
    return newOffer._id
  }

  async likeOffer(offer) {
    this.likes.push(offer)
    offer.likedBy.push(this)

    await offer.save()
    await this.save()
  }

  async leaveComment(offer, comment) {
    const newComment = await Comment.create({ offer, comment, sender: this })
    this.comments.push(newComment)

    offer.comments.push(newComment)

    await newComment.save()
    await this.save()
    return newComment
  }
}

personSchema.loadClass(Person)
personSchema.plugin(autopopulate)
personSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('Person', personSchema)
