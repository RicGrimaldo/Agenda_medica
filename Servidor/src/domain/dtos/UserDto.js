module.exports = class UserDto {
  constructor (id, email, password, roleId) {
    this._id = id
    this._email = email
    this._password = password
    this._roleId = roleId
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get email () {
    return this._email
  }

  set email (email) {
    this._email = email
  }

  get password () {
    return this._password
  }

  set password (password) {
    this._password = password
  }

  get roleId () {
    return this._roleId
  }

  set roleId (roleId) {
    this._roleId = roleId
  }
}
