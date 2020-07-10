const {Usuario} = require('../models')

function login(req, res) {
    //tomamos los datos del formulario
    const{email,password}=req.body;
    
//localizar en la BD el usuario
Usuario.findOne({where: {email, password}})
    .then(usuario => {
      if (usuario) {
        req.session.usuario = usuario;
        res.redirect("/");
      } else {
        res.render("login");
      }
    })
}


module.exports = {
    login
}