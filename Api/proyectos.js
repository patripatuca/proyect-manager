const {Proyecto}=require("../models")

function crearProyecto(req,res){
 Proyecto.create(req.body)
 .then(nuevoProyecto=>{
    res.status(201).json(nuevoProyecto)
 })
 .catch(err=>{

    res.status(400).json(err)
})
}

module.exports={
    crearProyecto,

    //añadir funcioes amedida que vayan apareciendo
}