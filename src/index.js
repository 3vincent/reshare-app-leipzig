const Person = require('./person')

const ben = new Person('Ben', 'ben@someemail.com', 29, '', ['Leipzig', '04277'])
const armagan = new Person('Armagan', 'armagan@someemail.com', 29, '', ['Berlin', '11231'])

const bensOffer = ben.createOffer('My old pillbox hat', ['Leipzig', '04277'], 'Clothing')
const bensOffer2 = ben.createOffer('Wash dishes', ['Leipzig', '04277'], 'Services')

armagan.createOffer('Dish Washer', ['Berlin', '11231'], 'Electrical Devices')
armagan.likeOffer(bensOffer)
armagan.likeOffer(bensOffer2)

ben.likeOffer(bensOffer)

console.log(ben)
console.log(armagan)

console.log(ben.profile)

// console.log('Bens Offers Liked by output:', ben.offers[0].likedBy)
