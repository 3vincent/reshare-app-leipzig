class Person {
    constructor(name, emailAddress, age, profilePhoto, location) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.age = age;
        this.profilePhoto = profilePhoto;
        this.location = location;

        this.offers = [];

    }
    
    createOffer(offerID, category, location) {
        return new Offer(offerID, category, location);
    }

    likeOffer(offer) {
        offer.likedBy.push(this)
    }

    saveOffer(offer) {
        offer.savedBy.push(this)
    }

}

class Offer {
    constructor(title, category = 'none', location) {
        this.title = title;
        this.category = category;
        this.location = location;
        this.creationTime = Date.now();
        this.duration = 604800;                  // 4 weeks in seconds
        this.offerUUID = Math.floor(Math.random() * 10);
        this.isOpen = true;
        this.likedBy = [];
        this.savedBy = [];

    }

    expire() {
        const age = Date.now() - creationTime;
        if (age > duration) {
            isOpen = false;
        }   
    }
}

const ben = new Person('Ben', 'bsukstorf@gmail.com', 29, null, 'Leipzig');
const armagan = new Person('Armagan', 'armagan@cototiv.org', null, 29, 'Berlin');

ben.createOffer('My old pillbox hat', 'Clothing', '04317');
ben.createOffer('Wash dishes', 'Services', '04317');

armagan.createOffer('Dish Washer', 'Electrical Devices', '11231');

console.log(ben);

// armagan.likeOffer(offer);
// console.log(ben, ben.offers[0].likedBy);