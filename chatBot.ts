import { Local } from "./Types/LocalConst"
import { Produtos } from "./Types/ProdutosConst"

export default class ChatBot{

    opcoes(opcao: string, usuario: string){

        if(opcao==="1"){
            const listaProdutos = Produtos.map(p => `id ${p.id} - ${p.nome} ${p.preco} R$`)
            return listaProdutos.join("\n")

        }
        else if(opcao==="2"){
            const listaLocal = Local.map(l => `id ${l.id} - ${l.nome}`)
            return listaLocal.join("\n")
        
        }
        else if(opcao==="3"){
            return "ola sou o (CHATBOT) sou representante virtual da empresa (empresa)"
        
        }
        else if(opcao==="4"){
            return `Mande lista de mensgens nesse formato informadando o id e quantidade
            x = n
            onde x equivale ao id do produto e n a quantidade
            ex... => 2 = 5
            para finalizar compra envie a mensagem ("Comprar")
            para Sair envie a mensagem ("Sair") `
        }
        else if(opcao==="5"){
            return '5 para entrar em vontato basta clicar no botão ao lado que sera direcionado ao nosso contato no whatsAppp'   
        }
        else if(opcao=="6"){
            return opcao   
        }
        else{
            return `Ola ${usuario} seja bem vindo ao atendimento virtual  Escolha uma das opções abaixo: 
            1 - Produtos
            2 - Locais de venda
            3 - Qual seu nome?
            4 - comprar 
            5 - Entre em contato
            6 - Quem somos nós`
        }

    }
}