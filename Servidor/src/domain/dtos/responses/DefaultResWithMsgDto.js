module.exports = class DefaultResWithMsgDto {
  constructor (status, message) {
    this._status = status
    this._message = message
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  get message () {
    return this._message
  }

  set message (message) {
    this._message = message
  }
}
