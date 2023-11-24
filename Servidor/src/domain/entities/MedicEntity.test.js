const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const MedicEntity = require('./MedicEntity')
const ScheduleDto = require('../dtos/ScheduleDto')

describe('Test medic entity', () => {
  const startDateTime = dayjs('20-02-2002 02:02:02', 'DD-MM-YYYY HH:mm:ss')
  const endDateTime = startDateTime.add(20, 'minutes')
  const ID = 1
  let medicEntity = null

  beforeEach(() => {
    medicEntity = new MedicEntity(ID, [])
  })

  it('should be defined', () => {
    expect(medicEntity).toBeDefined()
  })

  it('should add an schedule', () => {
    medicEntity.addSchedule(startDateTime.format(), endDateTime.format())
    expect(medicEntity.scheduleDtos.length).toBe(1)
  })

  it('should add an schedule with the same data', () => {
    medicEntity.addSchedule(startDateTime.format(), endDateTime.format())
    const scheduleDto = medicEntity.scheduleDtos.find((scheduleDto) => {
      return scheduleDto.startDateTime === startDateTime.format() && scheduleDto.endDateTime === endDateTime.format()
    })
    expect(scheduleDto).toBeDefined()
  })

  it('should validate if dates are in correct order', () => {
    expect(() => { medicEntity.addSchedule(endDateTime.format(), startDateTime.format()) }).toThrow(Error)
  })

  it('should validate if two dates does not start the same day', () => {
    medicEntity.addSchedule(startDateTime.format(), endDateTime.format())
    expect(() => { medicEntity.addSchedule(startDateTime.format(), endDateTime.format()) }).toThrow(Error)
  })

  it('should validate if two dates does not end the same day', () => {
    medicEntity.addSchedule(startDateTime.format(), endDateTime.format())
    expect(() => { medicEntity.addSchedule(startDateTime.add(15, 'minutes').format(), endDateTime.format()) }).toThrow(Error)
  })

  it('should validate if a date does not start inside another', () => {
    medicEntity.addSchedule(startDateTime.format(), endDateTime.format())
    expect(() => { medicEntity.addSchedule(startDateTime.add(15, 'minutes').format(), endDateTime.add(15, 'minutes').format()) }).toThrow(Error)
  })

  it('should validate if a date does not end inside another', () => {
    medicEntity.addSchedule(startDateTime.format(), endDateTime.format())
    expect(() => { medicEntity.addSchedule(startDateTime.subtract(15, 'minutes').format(), endDateTime.subtract(15, 'minutes').format()) }).toThrow(Error)
  })

  it('should validate if a date does not contain another', () => {
    medicEntity.addSchedule(startDateTime.format(), endDateTime.format())
    expect(() => { medicEntity.addSchedule(startDateTime.subtract(15, 'minutes').format(), endDateTime.add(15, 'minutes').format()) }).toThrow(Error)
  })

  it('should not add an schedule on a day that previously had schedules', () => {
    const scheduleDto = new ScheduleDto(10, startDateTime.add(1, 'hour').format(), endDateTime.add(1, 'hour').format())
    medicEntity.scheduleDtos.push(scheduleDto)
    expect(() => { medicEntity.addSchedule(startDateTime.format(), endDateTime.format()) }).toThrow(Error)
  })

  it('should add multiple complete schedules', () => {
    const MINUTES_PER_SESSION = 10
    medicEntity.addMultipleSchedules(startDateTime.format(), endDateTime.format(), MINUTES_PER_SESSION)
    const firstSchedule = medicEntity.scheduleDtos.find((scheduleDto) => {
      return scheduleDto.startDateTime === startDateTime.format() &&
        scheduleDto.endDateTime === startDateTime.add(MINUTES_PER_SESSION, 'minutes').format()
    })
    const secondSchedule = medicEntity.scheduleDtos.find((scheduleDto) => {
      return scheduleDto.startDateTime === startDateTime.add(MINUTES_PER_SESSION, 'minutes').format() &&
        scheduleDto.endDateTime === endDateTime.format()
    })
    expect(medicEntity.scheduleDtos.length).toBe(2)
    expect(firstSchedule).toBeDefined()
    expect(secondSchedule).toBeDefined()
  })

  it('should not add incomplete schedules', () => {
    const MINUTES_PER_SESSION = 15
    medicEntity.addMultipleSchedules(startDateTime.format(), endDateTime.format(), MINUTES_PER_SESSION)
    const firstSchedule = medicEntity.scheduleDtos.find((scheduleDto) => {
      return scheduleDto.startDateTime === startDateTime.format() &&
        scheduleDto.endDateTime === startDateTime.add(MINUTES_PER_SESSION, 'minutes').format()
    })
    expect(medicEntity.scheduleDtos.length).toBe(1)
    expect(firstSchedule).toBeDefined()
  })
})
