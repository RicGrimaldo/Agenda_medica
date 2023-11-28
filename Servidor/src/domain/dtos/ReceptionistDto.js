module.exports = class ReceptionistDto {
  constructor (id, name, curp, birthDate, email, phone, address, password, blocked) {
    this._id = id
    this._name = name
    this._curp = curp
    this._birthDate = birthDate
    this._email = email
    this._phone = phone
    this._address = address
    this._password = password
    this._blocked = blocked
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get name () {
    return this._name
  }

  set name (name) {
    this._name = name
  }

  get curp () {
    return this._curp
  }

  set curp (curp) {
    this._curp = curp
  }

  get birthDate () {
    return this._birthDate
  }

  set birthDate (birthDate) {
    this._birthDate = birthDate
  }

  get email () {
    return this._email
  }

  set email (email) {
    this._email = email
  }

  get phone () {
    return this._phone
  }

  set phone (phone) {
    this._phone = phone
  }

  get address () {
    return this._address
  }

  set address (address) {
    this._address = address
  }

  get password () {
    return this._password
  }

  set password (password) {
    this._password = password
  }

  get blocked () {
    return this._blocked
  }

  set blocked (blocked) {
    this._blocked = blocked
  }
}
