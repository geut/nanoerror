const format = require('quick-format-unescaped')

module.exports = function createError (code, message = '%s') {
  return class extends Error {
    static equals (err) {
      return err instanceof Error && err.isNanoerror && err.code === code
    }

    constructor (...args) {
      super(format(message, args))

      this.name = code
      this.code = code
      this.args = args
      this.unformatMessage = message

      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor)
      } else {
        this.stack = (new Error(this.message)).stack
      }
    }

    get isNanoerror () {
      return true
    }
  }
}
