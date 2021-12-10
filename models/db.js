const sequelize =require('sequelize')

const conSeq=new sequelize('mattheus','root','db123648',{
    host:'localhost',
    dialect:'mysql'
})
conSeq.authenticate().then(()=>{
    console.log('conexao com db realizada!')
}).catch(()=>{
    console.log('condexao falhou!')
})


module.exports=conSeq;