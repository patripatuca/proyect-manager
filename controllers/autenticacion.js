const {Usuario} = require('../models');
const md5 =require('md5');

function login(req, res) {
    //tomamos los datos del formulario
    const{email,password}=req.body;
 //email y que la huella md5 de la contraseña coincida tambien.   
//localizar en la BD el usuario
Usuario.findOne({where: {email, password:md5(password)}})
    .then(usuario => {
      if (usuario) {
        req.session.usuario = usuario;
        res.redirect("/");
      } else {
        res.render("login", {mensaje: "Usuario o contraseña incorrectos."});
      }
    })
}
//aquí se aplicaria el R.B.A.C para acceder a permisos.(controlAcesso)
function controlAcceso(permiso) {
  return function (req,res,next){
    if( req.session.usuario) next()
      else res.redirect("/login")

    
  }
}


module.exports = {
    login,
    controlAcceso
}