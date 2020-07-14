const {Usuario,Rol} = require('../models');
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
    const usuario=req.session.usuario
    if( usuario) {
     Usuario.findByPk(usuario.id,{
       include:[Rol]
     })
     .then (usuario=>{

//usaremos la function indexOf para buscare ese permiso. si no lo hay nos daba -1
     if(usuario && usuario.rol &&usuario.rol.permiso && usuario.rol.permiso.indexOf(permiso)!=-1)next()


       else res.status (403).send("NO está autorizado")
     

     })
    
    
    }else
    res.redirect("/login")
    

    
  }
}


module.exports = {
    login,
    controlAcceso
}