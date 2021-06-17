// Stolen from Stackoverflow
// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
//
module.exports = function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0 // eslint-disable-line no-use-before-define
    const v = c == 'x' ? r : (r & 0x3) | 0x8 // eslint-disable-line no-use-before-define
    return v.toString(16)
  })
}
