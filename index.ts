import { IMensagem } from "./Types/IMensagem";
import { IUsuario } from "./Types/IUsuario";
import cors from "cors"
import express, {Request, Response} from "express"
import { Server } from "socket.io"
import CryptoJS from "crypto-js"
import ChatBot from "./chatBot";
import { Produtos } from "./Types/ProdutosConst";
import { Local } from "./Types/LocalConst";
import { IHistorico } from "./Types/IHistorico";

const PORT = 3333

const app = express()
app.use(cors())


const server = require('http').createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
})

let flagComprar = false
let FinaizarCompra = false
let listaCompras: string[] = []

let historicoCompras: IHistorico[] = []

let precoTotal = 0

let mensagens  :IMensagem[]   = []
const users :IUsuario[] = []

app.get('/getNumber', (req : Request, res : Response)=> {
 
        const ciphertext = CryptoJS.AES.encrypt('oUsuario.numero', 'hash123').toString();
        res.status(200).send({sucesso:true, mensagemErro: '', resultado: ciphertext })

})

io.on('connection', (socket : any) => {
    console.log('New user connected.')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('userExit', (idUser : string) => {
        const index = users.findIndex(x=> x.id === idUser)
        if(index>-1) users.splice(index,1)
    })
    
    socket.on('adicionarMensagem', (msg: IMensagem) => {

        if(!flagComprar && !FinaizarCompra) mensagens.push(msg)

        if(!flagComprar && msg.mensagem !=="Comprar" && msg.mensagem!=="Sair" && !FinaizarCompra){
            const resposta = new ChatBot().opcoes(msg.mensagem,msg.autor, historicoCompras.filter(x=> x.idComprador === msg.idAutor))
            mensagens.push({
                idAutor: msg.idAutor,
                mensagem:resposta,
                autor:'chat',
                data: new Date()
            })
            flagComprar = msg.mensagem === "4"
        }

        if(!flagComprar && !FinaizarCompra) {}
        else {
            if(!FinaizarCompra)
            {
            const keys = msg.mensagem.split("=")
            const OProduto = Produtos.find(x => x.id=== Number(keys[0]))
            if(OProduto) {listaCompras.push(`${OProduto.nome} ${Number(OProduto.preco) * Number(keys[1])} R$`)

            precoTotal += Number(OProduto.preco) * Number(keys[1])}
            }
        }


        if(FinaizarCompra){

            FinaizarCompra = false
            const idLocal = Number(msg.mensagem)

            const oLocal = Local.find(x=> x.id === idLocal)
            if(!oLocal){
            mensagens.push({
                idAutor:msg.idAutor,
                mensagem:'Local invalido',
                autor:'chat',
                data: new Date()
            })
    }
    else{
            listaCompras.push(`Local de compra para retirar ${oLocal.nome}`)
            const lista = listaCompras.join("\n")
            mensagens.push({
                idAutor:msg.idAutor,
                mensagem:lista,
                autor:'chat',
                data: new Date()
            })

            historicoCompras.push({
                dataCompra : new Date(),
                idComprador: msg.idAutor,
                local: oLocal.nome, 
                valor: precoTotal,

            })
            listaCompras = []
            precoTotal = 0     
        }         
        }

        if(msg.mensagem==="Comprar"){
   
            listaCompras.push(`Preço Total : ${precoTotal.toFixed(2)} R$`)
            mensagens.push({
                idAutor:msg.idAutor,
                mensagem:'Digite o id do local de Compra',
                autor:'chat',
                data: new Date()
            })
            flagComprar = false
            FinaizarCompra = true
        }



        if(msg.mensagem ==="Sair"){
            flagComprar = false
            FinaizarCompra = false
            listaCompras = []
            precoTotal = 0  
        }

        socket.broadcast.emit('listaMensagens', mensagens)
    })

    socket.on('enterUser', (dataUser: any) => {
        users.push(dataUser)
    })

    socket.on('limparConversa', (id : string) => {

         while(true){
            const index = mensagens.findIndex(x=> x.idAutor === id)
            if(index>-1) mensagens.splice(index,1)
            else break
         }
         socket.broadcast.emit('listaMensagens', mensagens)

    })

    socket.emit('listaMensagens', mensagens)
})

io.listen(3334)
console.log(`SOCKET listen on http://localhost:${3334} `)
server.listen(PORT, ()=> {
    console.log(`server listen on http://localhost:${PORT} `) 
});


