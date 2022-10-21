const { test } = require('uvu')
const assert = require('uvu/assert')

const createError = require('..')

test('basic', () => {
  const BASIC_ERROR = createError('BASIC_ERROR', 'Basic error with args: %s %j')

  try {
    throw new BASIC_ERROR('str', { json: true })
  } catch (err) {
    assert.instance(err, Error)
    assert.instance(err, BASIC_ERROR)
    assert.is(err.name, 'BASIC_ERROR')
    assert.is(err.code, 'BASIC_ERROR')
    assert.is(err.message, 'Basic error with args: str {"json":true}')
    assert.is(err.unformatMessage, 'Basic error with args: %s %j')
    assert.ok(BASIC_ERROR.equals(err))
  }
})

test('fromError', () => {
  const BASIC_ERROR = createError('BASIC_ERROR', '%s')
  const customError = new Error('custom message')

  try {
    throw BASIC_ERROR.from(customError)
  } catch (err) {
    assert.instance(err, Error)
    assert.instance(err, BASIC_ERROR)
    assert.is(err.name, 'BASIC_ERROR')
    assert.is(err.code, 'BASIC_ERROR')
    assert.is(err.message, '[Error: custom message]')
    assert.ok(BASIC_ERROR.equals(err))
    assert.ok(err.equals(BASIC_ERROR))
    assert.ok(err.equals(err))
  }
})

test.run()
