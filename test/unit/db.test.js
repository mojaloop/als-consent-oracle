const { OracleDatabase } = require('../../src/db')

const fakeConfig = {
  client: 'mysql2',
  connection: {
    host: 'iouwerioj',
    database: 'dfjdsak',
    user: '90knvbzl',
    port: 'fusiaodvj'
  },
  pool: {
    min: 10,
    max: 10,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200
  },
  debug: false
}

describe('Database tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Constructor constructs client', async () => {
    const client = jest.fn()
    const clientConstructor = jest.fn().mockImplementation(() => {
      return client
    })
    const db = new OracleDatabase(fakeConfig, clientConstructor)
    await db.isConnected()
    expect(clientConstructor).toBeCalled()
    expect(clientConstructor).toBeCalledWith(
      { ...fakeConfig }
    )
  })

  test('isConnected runs inane query', async () => {
    const client = jest.fn()
    const clientConstructor = jest.fn().mockImplementation(() => {
      return client
    })
    const db = new OracleDatabase(fakeConfig, clientConstructor)
    client.raw = jest.fn()
    client.raw.mockReturnValueOnce(['2'])
    await db.isConnected()
    expect(client.raw).toBeCalled()
    expect(client.raw).toBeCalledWith('SELECT 1 + 1 AS result')
  })
})
