const format = require('quick-format-unescaped')

module.exports = function createError (code, message = '%s') {
  return class extends Error {
    constructor (...args) {
      super(format(message, args))

      this.name = code
      this.code = code
      this.args = args

      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor)
      } else {
        this.stack = (new Error(this.message)).stack
      }
    }
  }
}
