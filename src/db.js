const uuidv4 = require('./lib/uuid-func')
const Person = require('./models/person')
const Offer = require('./models/offer')
const Comment = require('./models/comment')

const persons = []
const offers = []

async function main() {
  // const bensOffer2 = await Offer.create({
  //   title: 'Wash dishes',
  //   offerUUID: uuidv4,
  //   location: ['Leipzig', '04277'],
  //   category: 'Services',
  //   description: 'My job is to do the dishes. I can help you clean if you need help',
  // })
  // await armagan.likeOffer(bensOffer2)
  // const commentb21 = await Comment.create({ creationTime: Date.now, comment: 'Awesome' })
  // const commentb22 = await Comment.create({ creationTime: Date.now, comment: 'test test test' })
  // await ben.leaveComment(commentb21)
  // await armagan.leaveComment(commentb22)
  // const armaganOffer = await Offer.create({
  //   title: 'Dish Washer',
  //   offerUUID: uuidv4,
  //   location: ['Berlin', '11234'],
  //   category: 'Electrical Devices',
  //   description: 'It is like new. Give it as-is.',
  // })
  // await armagan.createOffer(armaganOffer)
  // await ben.likeOffer(armaganOffer)
  // const commenta11 = await Comment.create({ creationTime: Date.now, comment: 'This is a very good dish washer' })
  // await ben.leaveComment(commenta11)
  // const commenta12 = await Comment.create({ creationTime: Date.now, comment: 'Again and again' })
  // await ben.leaveComment(commenta12)
  // const commenta13 = await Comment.create({ creationTime: Date.now, comment: 'Bump' })
  // await armagan.leaveComment(commenta13)
}

main()

exports.persons = persons
exports.offers = offers
