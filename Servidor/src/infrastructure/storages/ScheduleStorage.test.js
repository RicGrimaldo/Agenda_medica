const ScheduleStorage = require('./ScheduleStorage')

describe('Test ScheduleStorage', () => {
  const scheduleStorage = new ScheduleStorage(undefined)

  it('should be defined', () => {
    expect(scheduleStorage).toBeDefined()
  })
})
