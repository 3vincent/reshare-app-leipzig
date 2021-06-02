const logSymbols = require('log-symbols')

const Offer = require('./offer')

const Comment = require('./comments')

module.exports = class Person {
  constructor(name, emailAddress, age, profilePhoto, location) {
    this.name = name
    this.emailAddress = emailAddress
    this.age = age
    this.profilePhoto = profilePhoto
    this.location = location
    this.savedOffers = []
    this.offers = []
  }

  createOffer(title, location, category, descripton) {
    const newOffer = new Offer(title, location, category, descripton)
    this.offers.push(newOffer)
    return newOffer
  }

  likeOffer(offer) {
    offer.likedBy.push(this.name)
  }

  leaveComment(offer, comment) {
    const newComment = new Comment(offer, this, comment)
    offer.comments.push(newComment)
    return newComment
  }

  get profile() {
    return `

# ${logSymbols.info} ${this.name}'s Profile (${this.age})
    ${this.name} lives in ${this.location
      .slice()
      .reverse()
      .map(area => area)
      .join(' ')}

### ${this.name} has 
    ${this.offers.length} Offers

### Offers (${this.offers.length})
    ${this.offers
      .map(
        (offer, index) => `
    ${index + 1}. ${offer.title}
        Category: ${offer.category}
        Location: ${offer.location
          .slice()
          .reverse()
          .map(x => x)
          .join(' ')}
        => Status: ${offer.status}
        => Liked by ${offer.likedBy.map(person => person).join(', ')} (${offer.likedBy.length})
        => Commenters: ${offer.commenters
          .slice()
          .sort()
          .filter((commenter, index2, array) => array.indexOf(commenter) === index2)
          .join(', ')}
        => Total Comments: ${offer.commenters.length}`
      )
      .join('\n')}`
  }
}
