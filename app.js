const express =require('express')
const socket = require('socket.io')
const cors = require('cors')
const app=express()
const usuarioDb=require('./models/usuario');
const mensagemDb=require('./models/mensagem')
app.use(express.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","GET, PUT,POST, DELETE")
    res.header("Access-Control-Allow-Headers","X-PINGOTHER,Content-Type, Authorization")
    app.use(cors())
    next()
})
app.get('/',(req,res)=>{
    res.send('Olha Mattheus vamos terminar esse! e é serio')
})
//rota de criacao de mensagem
app.post('/cadastrar-mensagem',async(req,res)=>{
    //res.send('Cadastrar usuario')
    const dados=req.body
    
    await mensagemDb.create(dados)
    .then(()=>{
        return res.json({
            erro:false,
            mensagem:"Mensagem Cadastrada" 
        })
    }).catch((error)=>{
        return res.status(400).json({
            erro:true,
            mensagem:`Mensagem nao castrada: ${error}`
        })
    })
})


//rota de criacao de usuario
app.post('/cadastrar-usuario',async(req,res)=>{
    //res.send('Cadastrar usuario')
    const dados=req.body
    const usuario = await usuarioDb.findOne({
        where:{
            email:dados.email
        }
    })
    if(usuario){
        return res.status(400).json({
            erro:true,
            mensagem:"este email já esta cadastrado"
        })
    }
    await usuarioDb.create(dados)
    .then(()=>{
        return res.json({
            erro:false,
            mensagem:"Usuario Cadastrado" 
        })
    }).catch((error)=>{
        return res.status(400).json({
            erro:true,
            mensagem:`usuario nao castrado: ${error}`
        })
    })
})
app.post('/validar',async(req,res)=>{
    const usuario=await usuarioDb.findOne({
        attributes:['id','nome'],
        where:{
            email:req.body.email
        }
    })
    if(usuario===null)
    {
        return res.status(400).json({
            erro:true,
            mensagem:'Erro:nao encontrado o email'
        })
    }
    return res.json({
        error:false,
        mensagem:'usuario encontrado!',
        dadosUsuario:usuario
    })
})

const server=app.listen(8080,()=>{
    console.log('iniciei servidor 8080')
})

io=socket(server,{cors:{origin:"*"}})
io.on("connection",(socket)=>{
    console.log(socket.id)

    socket.on("sala_conectar",(dados)=>{
        console.log("sala:",dados)
        socket.join(dados) 
    })
    
    socket.on("enviar_mensagem",(dados)=>{
        console.log(dados)
        socket.to(dados.sala).emit("receber_mensagem",dados.conteudo)
        
    })
})