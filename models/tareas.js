const Sequelize = require('sequelize');
const sequelize = require('./db');

/**
 * modelo de tarea con la imformación de la misma.
 * Nótese que la fecha de vencimiebnto puede ser nula , lo que simboliza que la tarea no yiene por que tener una fecha límite.
 */
const Tareas = sequelize.define('tareas', {
    id:{type: Sequelize.INTEGER,primaryKey:true,autoIncremen:true},
    nombre: {type:Sequelize.STRING,allowNull:false},
    fechaInicio:{type:Sequelize.DATE,allowNull:false},
    fechaVencimiento:{type:Sequelize.DATE,allowNull:true},
    fechaFin:{type:Sequelize.DATE,allowNull:true}
});

module.exports = Tareas;