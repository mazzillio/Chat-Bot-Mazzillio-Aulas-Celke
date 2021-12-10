const Sequelize =require('sequelize')
const db=require('./db')

const Usuario=db.define('usuario',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nome:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
//Comando para criacao da tabela
//Usuario.sync()
//Usuario.sync({force:true})
module.exports=Usuario