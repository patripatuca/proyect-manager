const Sequelize = require('sequelize');
const sequelize = require('./db');

const Tareas = sequelize.define('tareas', {
    id:{type: Sequelize.INTEGER,primaryKey:true,autoIncremen:true},
    nombre: {type:Sequelize.STRING,allowNull:false},
    fechaInicio:{type:Sequelize.DATE,allowNull:false},
    fechaVencimiento:{type:Sequelize.DATE,allowNull:true},
    fechaFin:{type:Sequelize.DATE,allowNull:true}
});

module.exports = Tareas;