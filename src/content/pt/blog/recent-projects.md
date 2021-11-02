---
title: Projetos Recentes
summary: Alguns dos projetos que trabalhei recentemente
date: 2021-10-18T10:19:33.122Z
tags:
  - projects
---

# Projetos Recentes

Como dito anteriormente, gostaria de compartilhar alguns dos projetos "hobby" que estou experimentando recentemente.

---

## 1. [next-tailwind-base](https://github.com/brunocpf/next-tailwind-base)

Um boilerplate para PWA de Next.js com Tailwind, TypeScript, Jest e Storybook configurado, contendo as minhas preferências de ambiente (configuração do eslint/prettier/vscode) e a minha preferência de estrututa de diretórios, para economizar tempo ao criar novos projetos.

Preciso fazer uma limpa para remover alguns trechos de código herdados de um projeto anterior no repositório.

---

## 2. [ecommerce-frontend](https://github.com/brunocpf/ecommerce-frontend)

Um template para PWA de ecommerce, totalmente responsivo, usando Next.js (React), TypeScript, TailwindCSS, GraphQL, Stripe, framer-motion e autenticação com JWT/httponly cookies.

Tudo está ok, só preciso fazer alterações no design e deixar esquemas de cores, nome da loja, logo, estilos, etc do template mais genéricos e configuráveis, possivelmente em variáveis de ambiente

![Home](/projects/home.png)
![Products](/projects/products.png)
![Product](/projects/product.png)

---

## 3. [ecommerce-backend](https://github.com/brunocpf/ecommerce-backend)

Um template para backend de ecommerce usando o CMS strapi + GraphQL e Stripe para pagamentos, que acompanha a PWA acima. Inclui a interpretação segura do cookie httponly setado no projeto do frontend com CORS para identificar o usuário logado e criar encomendas.

Strapi é um CMS bem completo, e tudo está funcionando perfeitamente, mas infelizmente não tem suporte para TypeScript, e isso é meio que um deal breaker pra mim. Estou estudando uma forma de transpilar TypeScript em um projeto strapi, e está avançando, mas ainda não completei tudo. Pretendo criar um post aqui assim que conseguir.

---

## 4. [expo-paper-base](https://github.com/brunocpf/expo-paper-base)

Um boilerplate bem parecido com o next-tailwind-base, mas para projetos usando Expo (React Native) + React Native Paper. A estrutura de pastas é bem similar, fora a navegação (react navigation vs page routes no caso do Next JS).

---

## 5. [barapp](https://github.com/brunocpf/barapp)

App para informações de bares locais (ainda sem nome). Atualmente está bem no início e sendo feito com um PWA Next.js, mas pretendo alterar para React Native/Expo, e usar Amazon AppSync ou Strapi como backend GraphQL.

![BarApp](/projects/barapp.png)

---

## 6. [systrash](https://github.com/brunocpf/systrash)

App simples feita rápidamente em ambos Expo/React Native e Next.JS (PWA) sobre informações de empresas de reciclagem locais, incluindo uma enquete do Google Forms.

![SysTrash](/projects/systrash.png)

---

## 6. [bruno-fernandes.dev](https://github.com/brunocpf/personal-blog)

Este blog pessoal, feito como um PWA com Next.js, MUI (material ui) v5, TypeScript e framer-motion, com static site generation.

Atualmente os posts são lidos a partir de arquivos markdown em build time para gerar as páginas, mas pretendo mudar para um CMS e implementar um sistema de busca. Tentei usar o Firebase/Firestore mas parece ser overkill, além de não possuir full-text search sem ferramentas de terceiros tipo Algolia. Netlify-cms parece ser uma alternativa grátis e suficiente, mas ainda não aprofundei nesse assunto.
