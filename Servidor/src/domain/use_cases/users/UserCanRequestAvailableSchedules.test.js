const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
const UserCanRequestAvailableSchedulesUseCase = require('./UserCanRequestAvailableSchedules')
const ScheduleDto = require('../../dtos/ScheduleDto')

class FakeScheduleStorage {
  #availableScheduleDtos

  constructor (availableScheduleDtos) {
    this.#availableScheduleDtos = availableScheduleDtos
  }

  get availableScheduleDtos () {
    return this.#availableScheduleDtos
  }

  async getAvailableByMedic (medicId, startDateTime) {
    const start = dayjs(startDateTime)
    const result = this.availableScheduleDtos.filter((scheduleDto) => scheduleDto.medicId === medicId)
      .filter((scheduleDto) => dayjs(scheduleDto.startDateTime).isSameOrAfter(start))
    return new Promise((resolve) => {
      resolve(result)
    })
  }
}

describe('Test UserCanRequestAvailableSchedulesUseCase', () => {
  const START_DATE_TIME = dayjs('20-02-2002 02:02:02', 'DD-MM-YYYY HH:mm:ss')
  let userCanRequestAvailableSchedulesUC = null

  const generateScheduleStorage = () => {
    const scheduleStorage = new FakeScheduleStorage([])
    const scheduleDtos = [
      { id: 1, startDateTime: START_DATE_TIME.format(), endDateTime: START_DATE_TIME.add(30, 'minutes').format(), medicId: 1 },
      { id: 2, startDateTime: START_DATE_TIME.add(30, 'minutes').format(), endDateTime: START_DATE_TIME.add(60, 'minutes').format(), medicId: 1 },
      { id: 3, startDateTime: START_DATE_TIME.add(30, 'minutes').format(), endDateTime: START_DATE_TIME.add(60, 'minutes').format(), medicId: 2 }
    ]
    scheduleDtos.forEach((scheduleDto) => {
      scheduleStorage.availableScheduleDtos.push(new ScheduleDto(scheduleDto.id, scheduleDto.startDateTime, scheduleDto.endDateTime, scheduleDto.medicId))
    })
    return scheduleStorage
  }

  beforeEach(() => {
    userCanRequestAvailableSchedulesUC = new UserCanRequestAvailableSchedulesUseCase(generateScheduleStorage())
  })

  it('should be defined', () => {
    expect(userCanRequestAvailableSchedulesUC).toBeDefined()
  })

  it('should return available schedules', async () => {
    const MEDIC_ID = 1
    const START = START_DATE_TIME.add(15, 'minutes').format()
    const availableScheduleDtos = await userCanRequestAvailableSchedulesUC.getAvailableSchedules(MEDIC_ID, START)
    expect(availableScheduleDtos).toBeDefined()
    expect(availableScheduleDtos[0] instanceof ScheduleDto).toBeTruthy()
    expect(availableScheduleDtos.length).toBe(1)
  })
})
