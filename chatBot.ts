import { IHistorico } from "./Types/IHistorico"
import { Local } from "./Types/LocalConst"
import { Produtos } from "./Types/ProdutosConst"

export default class ChatBot{

    opcoes(opcao: string, usuario: string, lista : IHistorico[]){

        if(opcao==="1"){
            const listaProdutos = Produtos.map(p => `id ${p.id} - ${p.nome} ${p.preco} R$`)
            return listaProdutos.join("\n")

        }
        else if(opcao==="2"){
            const listaLocal = Local.map(l => `id ${l.id} - ${l.nome}`)
            return listaLocal.join("\n")
        
        }
        else if(opcao==="3"){
            return "ola sou o CHATTOTZ sou representante virtual da empresa (empresa) é um prazer conhece-lo"
        
        }
        else if(opcao==="4"){
            return `Mande lista de mensgens nesse formato informadando o id e quantidade
            x = n
            onde x equivale ao id do produto e n a quantidade
            ex... => 2 = 5
            para finalizar compra envie a mensagem ("Comprar")
            para Sair envie a mensagem ("Sair") `
        }
        else if(opcao==="7"){
            return '7 para entrar em vontato basta clicar no botão ao lado que sera direcionado ao nosso contato no whatsAppp'   
        }
        else if(opcao=="6"){
            return "Ola somos a empresa DYNATECH de venda de eletronicos para ajudar nessa sua jornada pelo mundo da tecnologia"   
        }
        else if(opcao==="5"){
            const historico = lista.map(p => `Compra no dia ${p.dataCompra.toLocaleString()} no valor ${p.valor} R$ Local ${p.local}`)
            return historico.join("\n")
        }
        else{
            return `Ola ${usuario} seja bem vindo ao atendimento virtual da empresa DYNATECH eu sou CHATTOTZ
            Escolha uma das opções abaixo: 
            1 - Produtos
            2 - Locais de venda
            3 - Qual seu nome?
            4 - comprar 
            5 - Historico de compras
            6 - Quem somos nós
            7 - Entre em contato
            `
        }

    }
}