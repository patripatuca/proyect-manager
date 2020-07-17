const {Proyecto}=require("../models")
//CREAR POST
function crearProyecto(req,res){
 Proyecto.create(req.body)
 .then(nuevoProyecto=>{
    res.status(201).json(nuevoProyecto)
 })
 .catch(err=>{

    res.status(400).json(err.message)
})
}
//leer todos los proyectos GET
function listarProyecto(req,res){
    Proyecto.findAll()
    .then(proyectos=>{
        res.status(200).json(proyectos)
    })
    .catch(err=>{
        res.status(400).json(err.message)
    })
}
//el get..leer uno
function  leerProyecto(req,res){
    Proyecto.findByPk(req.params.id,{
        include:[{model:Usuario,as:'participantes'},Tarea]
    })
    .then(proyecto=>{
        //aquí si el proyecto existe nos da ok.. pero si no existe nos dará el no encontrado
       if (proyecto) res.status(200).json(proyecto)
       else res,status(404).json("Proyecto no encontrado")
    })
    .catch(err=>{
        res.status(400).json(err.message)
    })
}
//el put
function modificarProyecto(req,res){
    Proyecto.findByPk(req.params.id)
    .then(proyecto=>{
        if (proyecto){
            Object.assign(proyecto,req.body)
            proyecto.save()
            .then (proyecto=>{
                res.status(200).json(proyecto)
            })
        }
        else res.status(404).json("proyecto no encontrado")
    })
    .catch(err=>{
        res.status(400).json(err.message)
    })
}

//el delete

function eliminarProyecto(req,res){ 
    Proyecto.findByPk(req.params.id)
    .then(proyecto=>{
        if (proyecto){
        proyecto.destroy()
        .then(()=>{
            res.status(200).json({})
        })
    }else{
        res.status(404).json("Proyecto no encontrado")
    }
})

    .catch(err=>{
        res.status(400).json(err.message)
    })
}

module.exports={
    crearProyecto,
    listarProyecto,
    leerProyecto,
    modificarProyecto,
    eliminarProyecto
    //añadir funcioes amedida que vayan apareciendo
}