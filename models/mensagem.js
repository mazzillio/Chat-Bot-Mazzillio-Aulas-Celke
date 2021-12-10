const Sequelize = require('sequelize')
const db = require('./db')

const Mensagem =db.define('Mensagens',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    mensagem:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    salaId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    usuarioId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
//Mensagem.sync({force:true})
module.exports=Mensagem 