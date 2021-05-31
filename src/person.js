const logSymbols = require('log-symbols')

const Offer = require('./offer')

module.exports = class Person {
  constructor(name, emailAddress, age, profilePhoto, location) {
    this.name = name
    this.emailAddress = emailAddress
    this.age = age
    this.profilePhoto = profilePhoto
    this.location = location

    this.offers = []
  }

  createOffer(title, location, category) {
    const newOffer = new Offer(title, location, category)
    this.offers.push(newOffer)
    return newOffer
  }

  prolongOffer(offerUUID) {
    // rethink 'offer duration'
    // maybe make it a counter that runs out.. when it is zero
    // the offer is marked as 'expired'
    // the user/person can then mark re-add it
    //
    return offerUUID
  }

  likeOffer(offer) {
    offer.likedBy.push(this)
  }

  saveOffer(offer) {
    offer.savedBy.push(this)
  }

  get profile() {
    return `
# ${this.name}'s Profile (${this.age})
Ben lives in ${this.location
      .reverse()
      .map(x => x)
      .join(' ')}
## ${logSymbols.info} ${this.name} has ${this.offers.length} Offers 

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
