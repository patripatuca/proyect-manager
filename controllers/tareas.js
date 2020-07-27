const { Tarea, Intervencion, Usuario } = require("../models");
const moment = require("moment");

/**
 * Controladpr para mostrar la informacion de una tarea en concreto. L ainformación de la tarea se obtiene mediante una consulata de atos con todas las intervenciones asocoadas a dicha tarea.
 * @param {*} req Petición , que contiene el parametro del ID de la tarea.
 * @param {*} res Respuesta.
 * 
 * La consulta trabaja de forma asíncrona , de tal modo que los datos de la tarea se obtien en una promesa.
 * Los datos obtenido se visualizan en la vista.
 */
function mostrarTarea(req, res) {
    const id = req.params.id;
    Tarea.findByPk(id, {include: ['intervenciones']})
    .then(tarea => {
        res.render('tarea', {
            tarea: {
                link: "/tareas/" + tarea.id,
                estado: tarea.fechaFin? "Finalizado" : "Pendiente",
                intervenciones: tarea.intervenciones,
                iniciada: tarea.intervenciones.some(x => x.fin==null),
                fechaInicio: moment(tarea.fechaInicio).format("DD/MM/YYYY"),
                fechaFin: tarea.fechaFin && moment(tarea.fechaFin).format("DD/MM/YYYY"),
                fechaVencimiento: tarea.fechaVencimiento && moment(tarea.fechaVencimiento).format("DD/MM/YYYY")  
            }
        })
    })
}function registrarAccionTarea(req, res) {
    const id = req.params.id
    const {accion} = req.body

    Tarea.findByPk(id, {include: [Usuario]})
    .then(async tarea => {
        const usuario = await Usuario.findByPk(req.session.usuario.id)

        if (accion == "start") {
            await Intervencion.create({usuarioId: usuario.id, tareaId: tarea.id, inicio: new Date()})
        }  
        else if (accion == "stop") {
            const intervencion = await Intervencion.findOne({
                where:{usuarioId: usuario.id, tareaId: tarea.id, fin: null}
            })
            intervencion.fin = new Date()
            await intervencion.save()
        }   
        else if (accion == "terminar") {
            const intervencion = await Intervencion.findOne({
                where:{usuarioId: usuario.id, tareaId: tarea.id, fin: null}
            })
            if (intervencion) {
                intervencion.fin = new Date()
                await intervencion.save()
            }
            tarea.fechaFin = new Date()
        }

        return await tarea.save()
    })
    .then(() => {
        res.redirect("/tareas/" + id)
    })
    .catch(err => {
        console.error(err);
        res.status(400).send(err.message)
    })
}





module.exports = {
    mostrarTarea,
    registrarAccionTarea
}