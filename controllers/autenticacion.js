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


module.exports = {
    login
}