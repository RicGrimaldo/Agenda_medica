module.exports = class LogInResDto {
  constructor (status, userId, roleId) {
    this._status = status
    this._userId = userId
    this._roleId = roleId
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  get userId () {
    return this._userId
  }

  set userId (userId) {
    this._userId = userId
  }

  get roleId () {
    return this._roleId
  }

  set roleId (roleId) {
    this._roleId = roleId
  }
}
