const Offer = require('./offer.js')

module.exports = class Person {
    constructor(name, emailAddress, age, profilePhoto, location) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.age = age;
        this.profilePhoto = profilePhoto;
        this.location = location;

        this.offers = [];

    }
    
    createOffer(title, location, category) {
        const newOffer = new Offer(title, location, category); //is there a better way other than binding the "new Offer" to a const
        this.offers.push(newOffer);                              //i.e. returning and pushing it directly ?!
        return newOffer;
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

## ${this.name} has ${this.offers.length} Offers

## Offers (${this.offers.length})

${this.offers
    .map(offer => {
        return `${offer.title} \n =>> Liked by ${offer.likedBy.map((person) => person.name).join(', ')} \n`;
    }) 
    .join('\n')
    }

        `;
    }
}