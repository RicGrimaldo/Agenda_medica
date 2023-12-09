const ScheduleDto = require("../../domain/dtos/ScheduleDto")

module.exports = class ScheduleStorage {
    #connector

    constructor (connector) {
        this.#connector = connector
    }

    get connector () {
        return this.#connector
    }

    async getById (id) {
        const query = `SELECT * FROM nimbo.citas WHERE citas.idCita = "${id}" LIMIT 1;`
        const results = await this.connector.runQuery(query).then(res => res.results)
        if (results && results[0]) {
            const scheduleDto = results[0]
            return new ScheduleDto(
                scheduleDto.idCita,
                scheduleDto.horaInicio,
                scheduleDto.horaTermino,
                scheduleDto.idMedico
            )
        }
        return undefined
    }
}