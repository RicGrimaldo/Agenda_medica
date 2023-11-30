const MysqlConnector = require('./MysqlConnector')

describe('Test MysqlConnector', () => {
  const mysqlConnector = new MysqlConnector()

  it('should be defined', () => {
    expect(mysqlConnector).toBeDefined()
  })
})
