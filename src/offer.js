const uuidv4 = require('./uuid-func')

module.exports = class Offer {
  constructor(title, location, category = 'none') {
    this.title = title
    this.location = location
    this.category = category
    this.descripton = ''
    this.creationTime = Date.now()
    this.duration = 4 * 7 * 24 * 60 * 60
    this.offerUUID = uuidv4()
    this.isOpen = true
    this.likedBy = []
    this.savedBy = []
  }

  expire() {
    const age = Date.now() - this.creationTime
    if (age > this.duration) {
      this.isOpen = false
    }
  }

}
