const Sequelize = require('sequelize');
const sequelize = require('./db');

const Rol = sequelize.define('rol', {
    id:{type: Sequelize.INTEGER,primaryKey:true,autoIncremen:true},
    nombre: {type:Sequelize.STRING,allowNull:false},
    permiso: {type:Sequelize.STRING(1000), allowNull:true}
    
});

module.exports = Rol;