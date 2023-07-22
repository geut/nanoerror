const format = require('quick-format-unescaped')

class Nanoerror extends Error {
  /**
   * @readonly
   * @static
   * @returns {string}
   */
  static get code () {
    return this.name
  }

  /**
   * @readonly
   * @static
   * @returns {boolean}
   */
  static get isNanoerror () {
    return true
  }

  /**
   * @static
   * @param {Nanoerror} err
   * @returns {boolean}
   */
  static equals (err) {
    return err.isNanoerror && err.code === this.code
  }

  /**
   * Creates a new Error
   * @param {...any} [args]
   */
  constructor (...args) {
    super()

    // get information from static props

    const self = /** @type {typeof Nanoerror} */(this.constructor)
    const code = self.code
    const unformatMessage = self.message

    /** @type {string} */
    this.message = format(unformatMessage, args)
    /** @type {string} */
    this.name = code
    /** @type {string} */
    this.code = this.name
    /** @type {Array<any>} */
    this.args = args
    /** @type {string} */
    this.unformatMessage = unformatMessage

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  /**
   * @readonly
   * @returns {boolean}
   */
  get isNanoerror () {
    return true
  }

  /**
   * @param {Nanoerror} err
   * @returns {boolean}
   */
  equals (err) {
    return err.isNanoerror && err.code === this.code
  }
}

/**
 * @type {string}
 * @static
 * @memberof Nanoerror
 */
Nanoerror.message = ''

/**
 * Creates a new Error class
 *
 * @param {string} code
 * @param {string} message
 */
function createError (code, message = '%s') {
  const obj = {
    [code]: class extends Nanoerror {
      /**
       * @static
       * @param {Error} err
       * @returns {Nanoerror}
       */
      static from (err) {
        const newErr = new obj[code](`[${err.toString()}]`)
        newErr.stack = err.stack || newErr.stack
        return newErr
      }
    }
  }

  obj[code].message = message

  return obj[code]
}

module.exports = createError
