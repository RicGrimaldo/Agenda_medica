module.exports = class SpecialityEntity {
  #id
  #acronym
  #name

  constructor (id, acronym, name) {
    this.#id = id
    this.#acronym = acronym
    this.#name = name
  }

  get id () {
    return this.#id
  }

  set id (id) {
    this.#id = id
  }

  get acronym () {
    return this.#acronym
  }

  set acronym (acronym) {
    this.#acronym = acronym
  }

  get name () {
    return this.#name
  }

  set name (name) {
    this.#name = name
  }
}
