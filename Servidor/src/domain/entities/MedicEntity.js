const ScheduleDto = require('../dtos/ScheduleDto')
const dayjs = require('dayjs')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)

module.exports = class MedicEntity {
  #id
  #name
  #curp
  #birthDate
  #email
  #phone
  #address
  #specialityId
  #office
  #professionalId
  #password
  #blocked
  #scheduleDtos

  constructor (id, name, curp, birthDate, email, phone, address, specialityId, office, professionalId, password, blocked, scheduleDtos) {
    this.#id = id
    this.#name = name
    this.#curp = curp
    this.#birthDate = birthDate
    this.#email = email
    this.#phone = phone
    this.#address = address
    this.#specialityId = specialityId
    this.#office = office
    this.#professionalId = professionalId
    this.#password = password
    this.#blocked = blocked
    this.#scheduleDtos = scheduleDtos
  }

  get id () {
    return this.#id
  }

  set id (id) {
    this.#id = id
  }

  get name () {
    return this.#name
  }

  set name (name) {
    this.#name = name
  }

  get curp () {
    return this.#curp
  }

  set curp (curp) {
    this.#curp = curp
  }

  get birthDate () {
    return this.#birthDate
  }

  set birthDate (birthDate) {
    this.#birthDate = birthDate
  }

  get email () {
    return this.#email
  }

  set email (email) {
    this.#email = email
  }

  get phone () {
    return this.#phone
  }

  set phone (phone) {
    this.#phone = phone
  }

  get address () {
    return this.#address
  }

  set address (address) {
    this.#address = address
  }

  get specialityId () {
    return this.#specialityId
  }

  set specialityId (specialityId) {
    this.#specialityId = specialityId
  }

  get office () {
    return this.#office
  }

  set office (office) {
    this.#office = office
  }

  get professionalId () {
    return this.#professionalId
  }

  set professionalId (professionalId) {
    this.#professionalId = professionalId
  }

  get password () {
    return this.#password
  }

  set password (password) {
    this.#password = password
  }

  get blocked () {
    return this.#blocked
  }

  set blocked (blocked) {
    this.#blocked = blocked
  }

  get scheduleDtos () {
    return this.#scheduleDtos
  }

  set scheduleDtos (scheduleDtos) {
    this.#scheduleDtos = scheduleDtos
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
    this.scheduleDtos.push(new ScheduleDto(undefined, startDateTime, endDateTime, this.id))
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
