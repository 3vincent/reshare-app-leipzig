module.exports = class Comment {
  constructor(offer, sender, comment) {
    this.offer = offer.offerUUID
    this.sender = sender.name
    this.comment = comment
  }
}
