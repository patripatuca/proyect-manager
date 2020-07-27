const { Usuario, Tarea } = require("../models");
const moment=require('moment')
/**
 * Esta función es un controlador de express que se encarga de mostrar las tareas asigbadas a un usuario en concreto.
 * @param {*} req Contiene los datos de la petición entre lso ciuales está el ID del usuario
 * @param {*} res Respuesta de la peticion.
 */

function dashboard(req, res) {
    const usuario = req.session.usuario;

    Usuario.findByPk(usuario.id, {
        include: {model: Tarea, as: 'tareas'}
    })
    .then(usuario => {
        const tareas = usuario.tareas.map(tarea => {
            return {
               nombre:tarea.nombre,
               link:"/tareas/"+tarea.id,
                fechaInicio:moment (tarea.fechaInicio).format("DD/MM/YYYY"),
                fechaVencimiento:tarea.fechaVencimiento && moment(tarea.fechaVencimiento).format("DD/MM/YYYY")
            }
        });
        res.render('dashboard', {usuario, tareas})
    })
    
}



module.exports = {
    dashboard
}