module.exports = class Comment {
  constructor(offer, sender, comment) {
    this.offerUUID = offer.offerUUID
    this.sender = sender.name
    this.creationTime = Date.now()
    this.comment = comment
  }
}
