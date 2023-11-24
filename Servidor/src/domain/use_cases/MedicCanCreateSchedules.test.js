const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const MedicEntity = require('../entities/MedicEntity')
const MedicCanCreateSchedulesUseCase = require('./MedicCanCreateSchedules')

class FakeMedicStorage {
  #medicEntities

  constructor (medicEntities) {
    this.#medicEntities = medicEntities
  }

  get medicEntities () {
    return this.#medicEntities
  }

  async getById (id) {
    return new Promise((resolve) => {
      resolve(this.medicEntities.find((medicEntity) => medicEntity.id === id))
    })
  }

  async createSchedules (medicId, scheduleDtos) {
    return new Promise((resolve) => {
      resolve(medicId && scheduleDtos.length > 0)
    })
  }
}

describe('Test medic can create schedules use case', () => {
  const ID = 1
  const WORK_START = dayjs('20-02-2002 02:02:02', 'DD-MM-YYYY HH:mm:ss')
  let medicCanCreateSchedulesUC = null

  beforeEach(() => {
    medicCanCreateSchedulesUC = new MedicCanCreateSchedulesUseCase(new FakeMedicStorage([new MedicEntity(ID, [])]))
  })

  it('should be defined', () => {
    expect(medicCanCreateSchedulesUC).toBeDefined()
  })

  it('should return true when at least one schedule was saved', async () => {
    const WORK_END = WORK_START.add(8, 'hours')
    const DURATION = 30
    const LUNCH_START = WORK_START.add(4, 'hours')
    const LUNCH_END = LUNCH_START.add(30, 'minutes')
    const result = await medicCanCreateSchedulesUC.createSchedules(ID, WORK_START, WORK_END, DURATION, LUNCH_START, LUNCH_END)
    expect(result).toBe(true)
  })

  it('should return false when not a single schedule was saved', async () => {
    const WORK_END = WORK_START.add(1, 'hours')
    const DURATION = 30
    const LUNCH_START = WORK_START.add(20, 'minutes')
    const LUNCH_END = LUNCH_START.add(20, 'minutes')
    const result = await medicCanCreateSchedulesUC.createSchedules(ID, WORK_START, WORK_END, DURATION, LUNCH_START, LUNCH_END)
    expect(result).toBe(false)
  })

  it('should return false when medic was not found', async () => {
    const WORK_END = WORK_START.add(8, 'hours')
    const DURATION = 30
    const LUNCH_START = WORK_START.add(4, 'hours')
    const LUNCH_END = LUNCH_START.add(30, 'minutes')
    const result = await medicCanCreateSchedulesUC.createSchedules(ID + 1, WORK_START, WORK_END, DURATION, LUNCH_START, LUNCH_END)
    expect(result).toBe(false)
  })
})
