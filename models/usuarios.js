const Sequelize = require('sequelize');
const sequelize = require('./db');

const Usuario = sequelize.define('usuario', {
    id:{type: Sequelize.INTEGER,primaryKey:true,autoIncremen:true},
    nombre: {type:Sequelize.STRING,allowNull:false},
     email:{type:Sequelize.STRING,allowNull:false,unique:true},
    password:{type:Sequelize.STRING,allowNullfalse}
    
});

module.exports = Usuario;
