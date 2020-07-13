const sequelize = require('./db');
const Proyecto=require('./proyectos');
const Tarea=require('./tareas');
const Usuario=require('./usuarios');
const Rol=require('./roles');

const Intervencion =require('./intervenciones');

//Definicion de las relaciones entre entidades//
Usuario.belongsToMany(Proyecto,{through:'participantes'})
Proyecto.hasMany(Tarea)
Tarea.belongsToMany(Usuario, {through: 'asignaciones'})
Tarea.belongsToMany(Usuario, {as: 'intervenciones', through: Intervencion})
Usuario.hasOne(Rol)
Rol.hasMany(Rol, {as: 'heredados'})


sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado con la base de datos.');
    sequelize.sync({alter: true}); //crea las tablas si no existen
  })
  .catch(err => {
    console.error('Error conectando con la base de datos: ', err);
  });

  module.exports = {
      sequelize,
      Proyecto,
      Usuario,
      Tarea,
      Rol,
      Intervencion
  }