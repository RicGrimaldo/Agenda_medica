require('dotenv').config();
const jwt = require('jsonwebtoken');
const loginController = {}
const mysql = require('mysql')
const bcrypt = require('bcrypt');
/**
 * Valida las credenciales para iniciar sesión
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
loginController.login = (req, res) => {

const correo=req.body.email_usuario;
const password=req.body.password_usuario;


  //Conexion con la base de datos//
    const conection = mysql.createConnection({
      host: process.env.HOST,
      port: 3306,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })
    conection.connect( (err) => {})

    //Se realizan las consultas para obtener datos y saber el tipo de usuario - Tipo Paciente//
    conection.query('SELECT correoPaciente, contrasenaPaciente, idPaciente FROM `pacientes` WHERE correoPaciente=?',[correo],(err, rows) =>{
      if(rows[0]!=null){
        const usuario=rows[0];
        bcrypt.compare(password, usuario.contrasenaPaciente, (err, coinciden) => {
          if (err) {
           
          } else {
            req.getConnection((err, conn) => {

              console.log('paso');
                  const payload = {
                    check:true
                };
                //Aqui se indica en cuanto tiempo expira el token
                const token = jwt.sign(payload, "clavesupermegasecreta",{
                  expiresIn: '7d'
                });
          
                if (err) return res.send(err)
                const datos ={
                  id:usuario.idPaciente,
                  rol:1,
                  token:token
                }
                res.json(datos);
            })
          
          }
        });
       
        
       
      }
    })
    
    //Se realizan las consultas para obtener datos y saber el tipo de usuario - Tipo Medico//
    conection.query('SELECT correoMedico, contrasenaMedico, idMedico FROM `medicos` WHERE correoMedico=?',[correo],(err, rows) =>{
      if(rows[0]!=null){
        const usuario=rows[0];
        bcrypt.compare(password, usuario.contrasenaMedico, (err, coinciden) => {
          if (err) {
           
          } else {
            req.getConnection((err, conn) => {

              console.log('paso');
                  const payload = {
                    check:true
                };
                //Aqui se indica en cuanto tiempo expira el token
                const token = jwt.sign(payload, "clavesupermegasecreta",{
                  expiresIn: '7d'
                });
          
                if (err) return res.send(err)
                const datos ={
                  id:usuario.idMedico,
                  rol:2,
                  token:token
                }
                res.json(datos);
            })
          }
        });
        
  
      }
    })

    //Se realizan las consultas para obtener datos y saber el tipo de usuario - Tipo Recepcionista//
    conection.query('SELECT correoRecepcionista, contrasenaRecepcionista, idRecepcionista FROM `recepcionistas` WHERE correoRecepcionista=?',[correo],(err, rows) =>{
      if(rows[0]!=null){
        const usuario=rows[0];
        bcrypt.compare(password, usuario.contrasenaRecepcionista, (err, coinciden) => {
          if (err) {
           
          } else {
            req.getConnection((err, conn) => {

              console.log('paso');
                  const payload = {
                    check:true
                };
                //Aqui se indica en cuanto tiempo expira el token
                const token = jwt.sign(payload, "clavesupermegasecreta",{
                  expiresIn: '7d'
                });
          
                if (err) return res.send(err)
                const datos ={
                  id:usuario.idRecepcionista,
                  rol:3,
                  token:token
                }
                res.json(datos);
            })
          }
        });
        

        
     
      }
    })
    
    //Se realizan las consultas para obtener datos y saber el tipo de usuario - Tipo Administrador//
    conection.query('SELECT correoAdministrador, contrasenaAdministrador, idAdministrador FROM `administradores` WHERE correoAdministrador=?',[correo],(err, rows) =>{
      if(rows[0]!=null){
        const usuario=rows[0];
        console.log(usuario.correoAdministrador);
        bcrypt.compare(password, usuario.contrasenaAdministrador, (err, coinciden) => {
          if (err) {
           
          } else {
            req.getConnection((err, conn) => {

              console.log('paso');
                  const payload = {
                    check:true
                };
                //Aqui se indica en cuanto tiempo expira el token
                const token = jwt.sign(payload, "clavesupermegasecreta",{
                  expiresIn: '7d'
                });
          
                if (err) return res.send(err)
                const datos ={
                  id:usuario.idAdministrador,
                  rol:4,
                  token:token
                }
                res.json(datos);
            })
          }
        });
        
     
      }
    })
   
   
};



module.exports = loginController;