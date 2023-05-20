const jwt = require('jsonwebtoken');
const loginController = {}
const mysql = require('mysql')

loginController.login = (req, res) => {

const correo=req.body.correo;
const password=req.body.password;

console.log(correo, password);

  //Conexion con la base de datos//
    const conection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'nimbo'
    })
    conection.connect( (err) => {})

    //Se realizan las consultas para obtener datos y saber el tipo de usuario - Tipo Paciente//
    conection.query('SELECT correoPaciente, contrasenaPaciente, idPaciente FROM `pacientes` WHERE correoPaciente="'+correo+'" AND contrasenaPaciente="'+password+'"',(err, rows) =>{
      if(rows[0]!=null){
        const usuario=rows[0];
        console.log(usuario.idPaciente);
        
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
    })
    
    //Se realizan las consultas para obtener datos y saber el tipo de usuario - Tipo Medico//
    conection.query('SELECT correoMedico, contrasenaMedico, idMedico FROM `medicos` WHERE correoMedico="'+correo+'" AND contrasenaMedico="'+password+'"',(err, rows) =>{
      if(rows[0]!=null){
        const usuario=rows[0];
        console.log(usuario.correoMedico);
        
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
    })

    //Se realizan las consultas para obtener datos y saber el tipo de usuario - Tipo Recepcionista//
    conection.query('SELECT correoRecepcionista, contrasenaRecepcionista, idRecepcionista FROM `recepcionistas` WHERE correoRecepcionista="'+correo+'" AND contrasenaRecepcionista="'+password+'"',(err, rows) =>{
      if(rows[0]!=null){
        const usuario=rows[0];
        console.log(usuario.correoRecepcionista);
        
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
    })
    
   
};

module.exports = loginController;