const uuidv4 = require('./uuid-func.js');

module.exports = class Offer {
    constructor(title, location, category = 'none') {
        this.title = title;
        this.location = location;
        this.category = category;
        this.descripton = '';
        this.creationTime = Date.now();
        this.duration = 604800;                  // 4 weeks in seconds
        this.offerUUID = uuidv4();
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
