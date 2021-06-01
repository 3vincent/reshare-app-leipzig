const Person = require('./person')

const ben = new Person('Ben', 'ben@someemail.com', 29, '', ['Leipzig', '04277'])
const armagan = new Person('Armagan', 'armagan@someemail.com', 29, '', ['Berlin', '11234'])

const bensOffer = ben.createOffer('My old pillbox hat', ['Leipzig', '04277'], 'Clothing')
armagan.likeOffer(bensOffer)
ben.likeOffer(bensOffer)
armagan.leaveComment(bensOffer, 'Does it run with battery too?')

const bensOffer2 = ben.createOffer('Wash dishes', ['Leipzig', '04277'], 'Services')
armagan.likeOffer(bensOffer2)
armagan.leaveComment(bensOffer2, 'Awesome')
ben.leaveComment(bensOffer2, 'Thank you')

const armaganOffer = armagan.createOffer('Dish Washer', ['Berlin', '11234'], 'Electrical Devices')
ben.likeOffer(armaganOffer)
ben.leaveComment(armaganOffer, 'This is a very good dish washer')
ben.leaveComment(armaganOffer, 'Again and again')
armagan.leaveComment(armaganOffer, 'Bump')

console.log(armagan.profile)
console.log(ben.profile)
