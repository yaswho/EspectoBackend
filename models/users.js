const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');
const db = require('./db');

const Users = db.define('Users', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Criar tabela 
Users.sync();
module.exports = Users; 