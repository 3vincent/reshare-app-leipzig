const uuidv4 = require('./uuid-func')

module.exports = class Offer {
  constructor(title, location, category = 'none', descripton = '') {
    this.title = title
    this.location = location
    this.category = category
    this.descripton = descripton
    this.creationTime = Date.now()
    this.duration = 4 * 7 * 24 * 60 * 60
    this.offerUUID = uuidv4()
    this.status = 'open'
    this.likedBy = []
    this.comments = []
  }

  expire() {
    const age = Date.now() - this.creationTime
    if (age > this.duration) {
      this.status = 'expired' // make distinction between expired, withdrawn or taken
    }
  }

  get commenters() {
    return this.comments.map(comment => comment.sender).join(', ')
  }

  get offerView() {
    return ``
  }
}
