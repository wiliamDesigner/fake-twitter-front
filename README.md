# Fake Twiter

Fake Twiter e uma aplicacao web inspirada no Twitter/X, criada com Next.js, React, TypeScript e Tailwind CSS. O projeto permite criar conta, fazer login, publicar tweets com texto e imagem, curtir, comentar, visualizar feed, acessar perfil, editar dados basicos e resetar senha.

## Tecnologias

- Next.js 16.2.3 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Font Awesome
- API externa: `https://fake-twitter-back.onrender.com`

## Funcionalidades

- Cadastro de usuario
- Login com usuario e senha
- Recuperacao/reset de senha
- Feed de tweets do usuario logado
- Criacao de tweets com texto e imagem
- Curtidas e comentarios em tweets
- Perfil do usuario com avatar, capa, bio, link e estatisticas
- Edicao local de perfil
- Listagem de seguidores e usuarios seguidos
- Busca com tela dedicada
- Layout responsivo com menu lateral, area central e coluna de sugestoes

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

A rota inicial redireciona para `/signin`.

## Scripts Disponiveis

```bash
npm run dev
```

Executa o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao.

```bash
npm run start
```

Executa a versao de producao depois do build.

## Estrutura do Projeto

```text
src/
  app/
    (auth)/
      signin/
      signup/
    (ui)/
      home/
      profile/
      search/
      tweet/
      [slug]/
    reset/
    globals.css
    layout.tsx
    page.tsx
  components/
    auth/
    home/
    nav/
    profile/
    ui/
  utils/
public/
  data/
  types/
  logo.png
  emo.jpg
```

## Rotas Principais

- `/signin`: tela de login
- `/signup`: tela de cadastro
- `/reset`: redefinicao de senha
- `/home`: feed principal
- `/profile`: perfil do usuario logado
- `/[slug]`: pagina de perfil por slug
- `/[slug]/edit`: edicao de perfil
- `/tweet/[id]`: pagina de tweet
- `/search?q=...`: tela de busca

## Dados e API

O projeto salva os dados do usuario logado no `localStorage`, usando a chave `user_data`. Algumas informacoes de apoio tambem existem em `public/data`, mas as principais acoes de usuario usam a API externa:

- login
- cadastro
- reset de senha
- criacao de tweets
- feed
- curtidas
- comentarios
- estatisticas de perfil
- seguidores e seguindo

Por depender de uma API hospedada fora do projeto, algumas telas podem nao funcionar corretamente se o backend estiver indisponivel.

## Observacoes

- O nome do projeto no `package.json` esta como `fake_twiter`.
- A interface esta em portugues e usa tema escuro.
- Algumas partes ainda parecem estar em desenvolvimento, como a busca com dados fixos e uma pagina de edicao de tweet/perfil com logica incompleta.
