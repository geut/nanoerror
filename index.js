const format = require('quick-format-unescaped')

class Nanoerror extends Error {
  /**
   * @static
   * @param {Nanoerror} err
   * @returns {boolean}
   */
  static equals (err) {
    return err && typeof err === 'object' && err.isNanoerror
  }

  /**
   * Creates a new Error
   * @param {string} code
   * @param {string} unformatMessage
   * @param {Array<any>} [args]
   */
  constructor (code, unformatMessage, args = []) {
    super(format(unformatMessage, args))

    /** @type {string} */
    this.name = code
    /** @type {code} */
    this.code = code
    /** @type {Array<any>} */
    this.args = args
    /** @type {string} */
    this.unformatMessage = unformatMessage

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(this.message)).stack
    }
  }

  /**
   * @readonly
   * @returns {boolean}
   */
  get isNanoerror () {
    return true
  }
}

/**
 * Creates a new Error class
 *
 * @param {string} code
 * @param {string} message
 */
function createError (code, message = '%s') {
  /**
   * @mixin
   */
  return class extends Nanoerror {
    /**
     * @static
     * @param {Nanoerror} err
     * @returns {boolean}
     */
    static equals (err) {
      return super.equals(err) && err.code === code
    }

    /**
     * Creates a new Error
     * @param {...any} [args]
     */
    constructor (...args) {
      super(code, message, args)
    }
  }
}

module.exports = createError
