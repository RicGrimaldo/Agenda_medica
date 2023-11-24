const ScheduleDto = require('../dtos/ScheduleDto')
const dayjs = require('dayjs')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)

module.exports = class MedicEntity {
  #id
  #scheduleDtos

  constructor (id, scheduleDtos) {
    this.#id = id
    this.#scheduleDtos = scheduleDtos
  }

  get id () {
    return this.#id
  }

  get scheduleDtos () {
    return this.#scheduleDtos
  }

  addMultipleSchedules (startDateTime, endDateTime, duration) {
    const DATE_TIME_LIMIT = dayjs(endDateTime)
    const DURATION_UNIT = 'minutes'
    let currentStart = dayjs(startDateTime)
    let currentEnd = currentStart.add(duration, DURATION_UNIT)

    while (currentStart.isSameOrBefore(DATE_TIME_LIMIT) && currentEnd.isSameOrBefore(DATE_TIME_LIMIT)) {
      this.addSchedule(currentStart.format(), currentEnd.format())
      currentStart = currentEnd
      currentEnd = currentStart.add(duration, DURATION_UNIT)
    }
  }

  addSchedule (startDateTime, endDateTime) {
    if (!this.#validateDatesAreCorrect(startDateTime, endDateTime)) throw new Error('Invalid date!')
    if (!this.#validateDatesAreNotOverlapping(startDateTime, endDateTime)) throw new Error('Invalid date!')
    if (!this.#validateDayIsAvailable([startDateTime, endDateTime])) throw new Error('Day unavailable!')
    this.scheduleDtos.push(new ScheduleDto(undefined, startDateTime, endDateTime))
  }

  #validateDatesAreCorrect (startDateTime, endDateTime) {
    return dayjs(startDateTime).isBefore(endDateTime)
  }

  #validateDatesAreNotOverlapping (startDateTime, endDateTime) {
    const start = dayjs(startDateTime)
    const end = dayjs(endDateTime)
    return !this.scheduleDtos.some((scheduleDto) => {
      return start.isSame(scheduleDto.startDateTime) || end.isSame(scheduleDto.endDateTime) ||
        (start.isBetween(scheduleDto.startDateTime, scheduleDto.endDateTime)) ||
        (end.isBetween(scheduleDto.startDateTime, scheduleDto.endDateTime)) ||
        (start.isBefore(scheduleDto.startDateTime) && end.isAfter(scheduleDto.endDateTime))
    })
  }

  #validateDayIsAvailable (dateStrings) {
    const dates = dateStrings.map((date) => dayjs(date))
    return !this.scheduleDtos
      .filter((scheduleDto) => scheduleDto.id != null)
      .some((scheduleDto) => {
        return dates.some((date) => date.isSame(scheduleDto.startDateTime, 'day') || date.isSame(scheduleDto.endDateTime, 'day'))
      })
  }
}
