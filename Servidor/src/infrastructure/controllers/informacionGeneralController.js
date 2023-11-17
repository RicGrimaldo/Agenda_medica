const informacionGeneralController = {}

/**
 * Regresa un JSON con todos los usuarios de las tablas recepcionistas,
 * medicos y pacientes de la base de datos
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
informacionGeneralController.obtenerUsuarios = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send(err)

    const listaUsuarios = {}

    const peticiones = {
      recepcionistas: 'SELECT idRecepcionista,nombreRecepcionista, CURPRecepcionista,fechaNacimientoRecepcionista,correoRecepcionista,telefonoRecepcionista,direccionRecepcionista,bloqueadoRecepcionista FROM recepcionistas ORDER BY nombreRecepcionista',
      medicos: 'SELECT idMedico,nombreMedico,CURPMedico,fechaNacimientoMedico,correoMedico,telefonoMedico,direccionMedico,especialidadMedico,consultorioMedico,cedulaProfesionalMedico,bloqueadoMedico FROM medicos ORDER BY nombreMedico',
      pacientes: 'SELECT idPaciente,nombrePaciente,CURPPaciente,fechaNacimientoPaciente,correoPaciente,telefonoPaciente,direccionPaciente,generoPaciente,bloqueadoPaciente FROM pacientes ORDER BY nombrePaciente'
    }

    for (const llavePeticion in peticiones) {
      const peticion = peticiones[llavePeticion]

      conn.query(peticion, (err, rows) => {
        if (err) return res.status(500).send(err)

        listaUsuarios[llavePeticion] = rows
        if (Object.keys(listaUsuarios).length === 3) res.status(200).json(listaUsuarios)
      })
    }
  })
}

module.exports = informacionGeneralController
