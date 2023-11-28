const AppointmentDto = require('../dtos/AppointmentDto')

module.exports = class PatientEntity {
  #id
  #name
  #curp
  #birthDate
  #email
  #phone
  #address
  #age
  #genre
  #password
  #blocked
  #appointmentDtos

  constructor (id, name, curp, birthDate, email, phone, address, age, genre, password, blocked, appointmentDtos) {
    this.#id = id
    this.#name = name
    this.#curp = curp
    this.#birthDate = birthDate
    this.#email = email
    this.#phone = phone
    this.#address = address
    this.#age = age
    this.#genre = genre
    this.#password = password
    this.#blocked = blocked
    this.#appointmentDtos = appointmentDtos
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

  get age () {
    return this.#age
  }

  set age (age) {
    this.#age = age
  }

  get genre () {
    return this.#genre
  }

  set genre (genre) {
    this.#genre = genre
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

  get appointmentDtos () {
    return this.#appointmentDtos
  }

  set appointmentDtos (appointmentDtos) {
    this.#appointmentDtos = appointmentDtos
  }

  addAppointment (incomingAppointmentDtos, scheduleId, modalityId) {
    if (this.#scheduleIsOccupied(incomingAppointmentDtos, scheduleId)) throw new Error('Invalid schedule!')
    this.appointmentDtos.push(new AppointmentDto(undefined, this.id, scheduleId, modalityId, ''))
  }

  #scheduleIsOccupied (appointmentDtos, scheduleId) {
    return appointmentDtos.some(appointmentDto => appointmentDto.scheduleId === scheduleId)
  }
}
