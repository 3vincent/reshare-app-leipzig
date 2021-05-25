class Person {
    constructor(name, age, profilePhoto, location) {
        this.name = name;
        this.age = age;
        this.location = location;
        this.profilePhoto = [];
        this.offers = [];

    }
    
    addOffer(offer) {
        this.offers.push(offer);
    }

    likeOffer(offer) {
        offer.likedBy.push(this)
    }

    saveOffer(offer) {
        offer.savedBy.push(this)
    }

}

class Offer {
    constructor(offerID, category = 'none') {
        this.offerID = offerID
        this.likedBy = []
        this.savedBy = []
        this.category = category;
    }
}

const ben = new Person('Ben', 29);
const armagan = new Person('Armagan', 29);

const offer = new Offer(123456);

console.log(offer);

ben.addOffer(offer);
armagan.likeOffer(offer);

console.log(ben, ben.offers[0].likedBy);