const { OracleDatabase } = require('../../src/db')
const Config = require('../../src/config')

describe('Database tests', () => {
  test('Constructor constructs client', async () => {
    const client = jest.fn()
    const clientConstructor = jest.fn().mockImplementation(() => {
      return client
    })
    const db = new OracleDatabase(Config.DATABASE, clientConstructor)
    await db.isConnected()
    expect(clientConstructor).toBeCalled()
    expect(clientConstructor).toBeCalledWith(
      { ...Config.DATABASE }
    )
  })

  test('isConnected runs inane query', async () => {
    const client = jest.fn()
    const clientConstructor = jest.fn().mockImplementation(() => {
      return client
    })
    const db = new OracleDatabase(Config.DATABASE, clientConstructor)
    client.raw = jest.fn()
    client.raw.mockReturnValueOnce(['2'])
    await db.isConnected()
    expect(client.raw).toBeCalled()
    expect(client.raw).toBeCalledWith('SELECT 1 + 1 AS result')
  })
})
