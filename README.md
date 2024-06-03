# Trabalho final da disciplina de Backend

- Professor: Douglas Nassif Roma Junior
- LinkedIn: https://www.linkedin.com/in/douglasjunior/

## Para rodar o projeto

1. Baixe o projeto
1. Instale as dependências
    ```
    npm install
    ```
1. Configure as variáveis de ambiente no arquivo `dev.env`
    > Você precisa estar com o `MySQL` rodando e com um banco de dados já criado.
    > 
    > As tabelas serão criadas automaticamente pelo `Sequelize`.
1. Rode o projeto
    ```
    npm run dev
    ```

## Rotas públicas

### Cadastro de usuários 

> POST /users
>
> Body:
> ```json
> {
>   "name": "Fulano da Silva",
>   "email": "fulano@email.com",
>   "password": "12345678"
> }
> ```

### Login de usuários 

> POST /users/login
>
> Body:
> ```json
> {
>   "email": "fulano@email.com",
>   "password": "12345678"
> }
> ```

### Obter todos os produtos

> GET /product

Obtém todos os produtos, incluindo suas categorias.

**Resposta de sucesso:**
```json
[
  {
    "id": 1,
    "name": "Produto A",
    "description": "Descrição do Produto A",
    "price": 100.0,
    "category": {
      "id": 1,
      "name": "Categoria A"
    }
  },
  {
    "id": 2,
    "name": "Produto B",
    "description": "Descrição do Produto B",
    "price": 150.0,
    "category": {
      "id": 2,
      "name": "Categoria B"
    }
  }
]
```
### Obter produto por ID

> GET product/:id
> 
>```js
>{
>   "id": 1,
>   "name": "Produto A",
>   "description": "Descrição do Produto A",
>   "price": 100.0,
>   "category": {
>     "id": 1,
>     "name": "Categoria A"
>   }
>}
>```

## Rotas prívadas
Todas as rotas autenticadas exigem que o token jwt seja passado no cabeçalho (header) chamado Authorization.

### Obter produtos favoritados

> GET /favorite

### Adicionar produto no favoritos

> POST /favirote/:idProduct
>
> idProduct(Parametro): id do produto que será favoritado.

### Remover produto do favoritos

> DELETE /favorite/:idProduct
>
> idProduct(Parametro): id do produto que será desfavoritado.