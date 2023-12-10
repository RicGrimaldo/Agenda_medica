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

    async getAvailableByMedic (medicId, startDateTime){
        const query = `
            SELECT * FROM citas 
            WHERE idMedico = ? 
            AND CONCAT(fecha, ' ', horaInicio) >= ?
            AND idPaciente IS NULL;`
    
        try {
            const results = await this.connector.runQuery(query, [medicId, startDateTime]).then(res => res.results)
            if (results) {
                return results.map((schedule) => {
                    return new ScheduleDto(
                        schedule.idCita,
                        schedule.horaInicio,
                        schedule.horaTermino,
                        schedule.idMedico
                    )
                })
            }
            return results
        } catch (error) {
            console.error("Error al obtener citas disponibles:", error)
            throw error
        }
    }
}