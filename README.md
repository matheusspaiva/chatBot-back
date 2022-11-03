# Procedimentos para rodar o servidor

## npm install
### - Instala todas as dependencias que o projeto tem

## npm run dev
### - Executa de fato o servidor


# Funcionamento

## Socket
Atraves do socket que o back-end se comunica em tempo real com o front end, visto que o socket fica 'escutando' algo acontecer e quando acontece faz uma determinada ação. 
Neste caso o socket fica esutando quando algum usuario entra na aplicação para adicionar os os seus dados, alem disso o socket vai servir para para ficar escutando quando o usuario manda uma mensagem e logo faz o processamento de resposta do chatBOt 

## Express
Atraves do express criamos um endpoint exlusivo para puxar o numero da 'loja' que vai ser consumida por uma api de integração do WhatsApp no front. Por motivos de segurança o numero vai ser passado do servidor criptografado e ser descriptografado no lado do cliente 
