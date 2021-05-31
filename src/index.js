const Person = require('./person')

const ben = new Person('Ben', 'ben@someemail.com', 29, '', ['Leipzig', '04277'])
const armagan = new Person('Armagan', 'armagan@someemail.com', 29, '', ['Berlin', '11234'])

const bensOffer = ben.createOffer('My old pillbox hat', ['Leipzig', '04277'], 'Clothing')
const bensOffer2 = ben.createOffer('Wash dishes', ['Leipzig', '04277'], 'Services')

const armaganOffer = armagan.createOffer('Dish Washer', ['Berlin', '11234'], 'Electrical Devices')
armagan.likeOffer(bensOffer)
armagan.likeOffer(bensOffer2)

ben.likeOffer(bensOffer)
ben.likeOffer(armaganOffer)

console.log(ben)
console.log(armagan)

console.log(armagan.profile)
console.log(ben.profile)

// console.log('Bens Offers Liked by output:', ben.offers[0].likedBy)

// toDo for Weekend: Create Comment Class

ben.leaveComment(armaganOffer, 'This is a very good dish washer')
ben.leaveComment(armaganOffer, 'Again and again')
const armagansComment = armagan.leaveComment(armaganOffer, 'Bump')
console.log(armaganOffer)
console.log(armagansComment)
