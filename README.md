# NOVA-AURÉLIA-API

<img src="https://i0.statig.com.br/bancodeimagens/ac/lh/jl/aclhjlddzn8bftdqih882tkx5.jpg" alt="Image of an LGBTQIA+ flag" style="align: center;" height="200"/>

## INTRODUÇÃO


Olá! Sejam bem vindas à documentação da Nova-Aurélia-api. Este é o meu projeto final para conclusão do curso de backend da {Reprograma}. 

Ao entender a linguagem como um instrumento de identificação social, esta aplicação foi criada para registro de léxico LGBTQIAP+ e seus significados dentro da comunidade por todo o território nacional. A aplicação foi inspirada na *Aurélia - a dicionária da língua afiada* (2006) de Fred Libi e Vitor Scippe.

A Nova-Aurélia-api busca ser um meio de mostrar a importância das variações linguísticas, especificamente dentro da comunidade LGBTQIAP+, e o conhecimento sobre elas. As diversas variações possuem diferenças linguísticas, inclusive nas pequenas comunidades e essas variantes se constituem em diversos níveis: o fonético, o morfológico, o sintático, semântico, o pragmático e o discursivo. As mudanças linguísticas de nível lexical podem ocorrer devido a influências regionais ou internas, geralmente acontecem por toda uma região brasileira ou grupos menores específicos.

Dessa forma, a ideia da Nova-Aurélia-api surgiu como uma forma mapeamento de léxico LGBTQIAP+ pelo Brasil, já que, ao utilizar a api, existe um campo de registro de usuários - que solicita algumas informações sobre aquela pessoa - e o campo de registro das palavras, que solicita informações como: ano, localidade, significado daquela palavra etc. Por conseguinte, forma-se um banco de dados com as palavras adicionadas pelos usuários.


## FUNCIONAMENTO

A Nova-Aurélia possibilita a criação e armazenamento de dois tipos de informações: registro de pessoas e de palavras. 
Assim, torna-se possível identificar e traçar o perfil dos usuários dessa API, já que as informações requisitadas contam com: _username_, email, senha, nome, idade, gênero e orientação sexual.
Do mesmo modo, por meio do registro de palavras é possível analisar os seus vieses de acordo com a data de registro, localidade e significado. O conjunto de informações requisitadas para tal registro conta com: palavra, descrição, ano, estado e id do usuário que a registrou.

### PEOPLE

Local de registro e armazenamento de dados dos usuários:

    {
        "username": "donna_",
        "email": "donna@example.com",
        "password": "senha123",
        "name": "Donna",
        "age": 20,
        "gender": "mulher cisgênero",
        "sexualOrientation": "lésbica"
    }

___
### WORDS

Local de registro e armazenamento das palavras:

    {
        "word": "passada",
        "description": "quando uma pessoa está chocada por  uma informação que recebeu",
        "year": "2023",
        "state": "Minas Gerais",
        "userId": "64bf2adbf3d3ba19a9240143"
    }

## DEPENDÊNCIAS
<table>
<thead>
<tr>
<th>Library</th>
<th>Version</th>
</tr>
</thead>
<tr>
<td>bcrypt</td>
<td>5.1.0</td>
</tr>
<tr>
<td>cors</td>
<td>2.8.5</td>
</tr>
<tr>
<td>dotenv</td>
<td>16.3.1</td>
</tr>
<tr>
<td>express</td>
<td>4.18.2</td>
</tr>
<tr>
<td>jsonwebtoken</td>
<td>9.0.1</td>
</tr>
<tr>
<td>mongoose</td>
<td>6.7.1</td>
</tr>
<tr>
<td>swagger-autogen</td>
<td>2.23.5</td>
</tr>
<tr>
<td>swagger-ui-express</td>
<td>5.0.0</td>
</tr>
<tr>
<td>jest</td>
<td>29.6.1</td>
</tr>
<tr>
<td>nodemon</td>
<td>3.0.1</td>
</tr>
</table>

## ROTAS E REQUISIÇÕES

### PEOPLE (USUÁRIO)

<table>
<thead>
<tr>
<th>Verbo</th>
<th>Endpoint</th>
<th>Função </th>
<th>Status</th>
<th>Auth</th>
</tr>
</thead>
<tr>
<td>POST</td>
<td>/addUser</td>
<td>Adiciona um usuário</td>
<td>201</td>
<td>:x:</td>
</tr>
<tr>
<td>GET</td>
<td>/allUsers</td>
<td>Busca todos os usuários</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>GET</td>
<td>/user/:id</td>
<td>Busca usuário pelo ID</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>POST</td>
<td>/user/login</td>
<td>Acessa login do usuário</td>
<td>200</td>
<td>:x:</td>
</tr>
<tr>
<td>DELETE</td>
<td>/:id</td>
<td>Deleta um usuário</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
</table>

____
### WORDS (PALAVRAS)

<table>
<thead>
<tr>
<th>Verbo</th>
<th>Endpoint</th>
<th>Função </th>
<th>Status</th>
<th>Auth</th>
</tr>
</thead>
<tr>
<td>GET</td>
<td>/allWords</td>
<td>Busca todas as palavras</td>
<td>200</td>
<td>:x:</td>
</tr>
<tr>
<td>GET</td>
<td>/:id</td>
<td>Busca palavra pelo ID</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>POST</td>
<td>/create</td>
<td>Registra uma palavra</td>
<td>201</td>
<td>:x:</td>
</tr>
<tr>
<td>GET</td>
<td>/wrd/:word</td>
<td>Busca palavra por meio da própria palavra registrada</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>GET</td>
<td>/date/:year</td>
<td>Busca palavra pelo ano de registro</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>GET</td>
<td>/user/:username</td>
<td>Busca palavra pelo username do usuário</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>PATCH</td>
<td>/update/:id</td>
<td>Atualiza palavra por ID</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>PATCH</td>
<td>/update/:word</td>
<td>Atualiza palavra por meio da própria palavra registrada</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>DELETE</td>
<td>/delete/:id</td>
<td>Deleta a palavra pelo ID</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>DELETE</td>
<td>/delete/wrd/:word</td>
<td>Deleta palavra por meio da própria palavra registrada</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>DELETE</td>
<td>/delete/date/:year</td>
<td>Deleta todas as palavras registradas em um ano</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
<tr>
<td>DELETE</td>
<td>/delete/user/:username</td>
<td>Deleta todas as registradas por um username</td>
<td>200</td>
<td>:heavy_check_mark:</td>
</tr>
</table>


## BANCO DE DADOS

Para construir esta aplicação, foi utilizado o MongoDB Atlas juntamente ao mongoose.


## AUTENTICAÇÃO

Para a segurança das rotas foi utilizado o jsonwebtoken, bcrypt e um encriptador em hash.

## TESTES

Os testes foram realizados com jest. Ao construir _mocks_ por meio do schema de **words**, o sistema de CRUD foi testado com dados simulados.  


## CONTATO

[LinkedIn](https://www.linkedin.com/in/marianadasantos/ "LinkedIn")
