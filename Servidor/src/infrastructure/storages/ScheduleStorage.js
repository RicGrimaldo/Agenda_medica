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
            const fecha = scheduleDto.fecha.toISOString().split('T')[0]
            const fechaHoraInicio = `${fecha}T${scheduleDto.horaInicio}`
            const fechaHoraFin = `${fecha}T${scheduleDto.horaTermino}`
            return new ScheduleDto(
                scheduleDto.idCita,
                new Date(fechaHoraInicio),
                new Date(fechaHoraFin),
                scheduleDto.idMedico
            )
        }
        return undefined
    }

    async getAvailableByMedic (medicId, startDateTime){
        const query = `
            SELECT * FROM citas 
            WHERE idMedico = ?
            AND fecha=?
            AND CONCAT(fecha, ' ', horaInicio) >= NOW()
            AND idPaciente IS NULL;`
    
        try {
            const results = await this.connector.runQuery(query, [medicId, startDateTime]).then(res => res.results)
            if (results) {
                return results.map((schedule) => {
                    const fecha = schedule.fecha.toISOString().split('T')[0]
                    const fechaHoraInicio = `${fecha}T${schedule.horaInicio}`
                    const fechaHoraFin = `${fecha}T${schedule.horaTermino}`
                    return new ScheduleDto(
                        schedule.idCita,
                        new Date(fechaHoraInicio),
                        new Date(fechaHoraFin),
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