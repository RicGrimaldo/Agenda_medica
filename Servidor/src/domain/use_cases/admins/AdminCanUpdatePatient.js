const UpdatePatientResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanUpdatePatientUseCase {
  #userStorage
  #patientStorage
  #appointmentStorage

  constructor (userStorage, patientStorage, appointmentStorage) {
    this.#userStorage = userStorage
    this.#patientStorage = patientStorage
    this.#appointmentStorage = appointmentStorage
  }

  get userStorage () {
    return this.#userStorage
  }

  get patientStorage () {
    return this.#patientStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async update (id, patientDto) {
    const email = patientDto.email || patientDto.correoPaciente
    const blocked = patientDto.blocked || patientDto.bloqueadoPaciente

    const validEmail = await this.validateEmail(id, email)

    if (validEmail) {
      if (blocked) {
        const releaseAppointments = await this.appointmentStorage.releaseByPatientId(id)
        if (!releaseAppointments.status) {
          return new UpdatePatientResDto(releaseAppointments.status, releaseAppointments.message)
        }
      }

      const patient = await this.patientStorage.update(id, patientDto)
      return new UpdatePatientResDto(patient.status, patient.message)
    }

    return new UpdatePatientResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (id, email) {
    const user = await this.userStorage.findByEmail(email)
    return !user || parseInt(user.id) === parseInt(id)
  }
}
