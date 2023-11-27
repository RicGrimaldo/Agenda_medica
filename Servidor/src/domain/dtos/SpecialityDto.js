module.exports = class SpecialityDto {
  constructor (id, acronym, name) {
    this._id = id
    this._acronym = acronym
    this._name = name
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get acronym () {
    return this._acronym
  }

  set acronym (acronym) {
    this._acronym = acronym
  }

  get name () {
    return this._name
  }

  set name (name) {
    this._name = name
  }
}
