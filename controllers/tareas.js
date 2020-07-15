const { Tarea, Intervencion, Usuario } = require("../models");
const moment = require("moment");

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
}



module.exports = {
    mostrarTarea
}