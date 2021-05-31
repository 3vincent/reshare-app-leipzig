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

  createOffer(title, location, category) {
    const newOffer = new Offer(title, location, category)
    this.offers.push(newOffer)
    return newOffer
  }

  likeOffer(offer) {
    offer.likedBy.push(this)
  }

  leaveComment(offer, comment) {
    const newComment = new Comment(offer, this, comment)
    return newComment
  }

  get profile() {
    return `

# ${logSymbols.info} ${this.name}'s Profile (${this.age})
${this.name} lives in ${this.location
      .reverse()
      .map(x => x)
      .join(' ')}
## ${this.name} has ${this.offers.length} Offers 

## Offers (${this.offers.length})

${this.offers
  .map(
    (offer, index) =>
      `${index + 1}. ${offer.title} 
   Category: ${offer.category}
   Location: ${this.location
     .reverse()
     .map(x => x)
     .join(' ')}
   => Liked by ${offer.likedBy.map(person => person.name).join(', ')} \n`
  )
  .join('\n')}

        `
  }
}
