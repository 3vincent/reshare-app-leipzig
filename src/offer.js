// Stolen from Stackoverflow
// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
//
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}
//

module.exports =  class Offer {
    constructor(title, location, category = 'none') {
        this.title = title;
        this.location = location;
        this.category = category;
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
