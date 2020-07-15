const Sequelize = require('sequelize');
const sequelize = require('./db');

const Intervencion = sequelize.define('intervencion', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    inicio: {type: Sequelize.DATE, allowNull: false,defaultValue:Sequelize.Now},
    fin: {type: Sequelize.DATE, allowNull: true}
});

module.exports = Intervencion;