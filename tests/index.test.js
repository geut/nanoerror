const createError = require('..')

test('basic', () => {
  const BASIC_ERROR = createError('BASIC_ERROR', 'Basic error with args: %s %j')

  try {
    throw new BASIC_ERROR('str', { json: true })
  } catch (err) {
    expect(err).toBeInstanceOf(Error)
    expect(err).toBeInstanceOf(BASIC_ERROR)
    expect(err.name).toBe('BASIC_ERROR')
    expect(err.code).toBe('BASIC_ERROR')
    expect(err.message).toBe('Basic error with args: str {"json":true}')
  }
})
