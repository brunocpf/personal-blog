---
title: TailwindCSS e Bibliotecas de Componentes
summary: Desabafo sobre TailwindCSS e bibliotecas de componentes como MUI (material-ui) baseada nas minhas experiências pessoais
date: 2021-10-13T13:20:00.000Z
tags:
  - css
  - frontend
  - react
  - nextjs
image: /tailwindcss.png
---

# TailwindCSS e Bibliotecas de Componentes

[TailwindCSS](https://tailwindcss.com/) é um sistema para estilização baseado em classes utilitárias pré-construidas de CSS. Sua flexibilidade e facilidade de uso está fazendo com que rapidamente se torne uma das soluções de estilização mais adotadas em aplicações web, com [mais de 1 milhão de downloads semanais no NPM](https://www.npmtrends.com/tailwindcss) atualmente. Nesse post, gostaria de compartilhar um pouco da minha experiência usando esse sistema, sem entrar em detalhes de como a biblioteca funciona (você pode dar uma olhada na [documentação oficial](https://tailwindcss.com/docs), que é muito bem feita e completa, por sinal)!

Meu primeiro contato com Tailwind começou quando o sistema ainda estava em beta. Assim como vários outros, a minha reação inicial não foi muito boa. "Isso é pior que inline styles! Impossível de manter!". E assim como vários outros, meu ceticismo se provou completamente errado. Tailwind adota a filosofia "utility-first", que, [como o autor explica](https://tailwindcss.com/docs/utility-first), é uma abordagem cujos benefícios são apreciados somente quando experimentados.

Sou uma pessoa que apreciava a rapidez de inicialização de projetos e protótipos razoavelmente bonitos utilizando bibliotecas de componentes como MUI (Material UI), AntDesign e Bootstrap, mas após experimentar o paradigma do Tailwind, acho que não volto mais atrás. A seguir, alguns pontos que me levaram a essa decisão, baseando nas minhas experiências em projetos React (principalmente Next.js).

<br>

---

<br>

## 1. Configuração Inicial

A instalação e configuração inicial do TailwindCSS é relativamente simples. Para [adicioná-lo ao projeto Next.js](https://tailwindcss.com/docs/guides/nextjs), por exemplo, você só precisa rodar o CLI do Tailwind, que irá gerar os arquivos de configuração, e em seguida incluir o CSS do Tailwind na aplicação, usando um import normal ou PostCSS. Pode ser que precise alterar algum valor de configuração, mas isso é geralmente feito sem dores.

Já o MUI, por exemplo, é um pouco mais chato, principalmente se está usando server side rendering. Em todo projeto novo é necessário configurar o tema e a configuração de SSR para que o emotion/styled components funcione corretamente. Gastei um dia inteiro trabalhando no código desse blog (que usa MUI) para que SSR com emotion funcione sem conflitos. Os autores facilitaram esse processo a partir de [templates pré-configurados que você pode clonar](https://github.com/mui-org/material-ui/tree/00827a5725d76fcfba87222837c425a3e8f19cbb/examples/nextjs-with-typescript), mas pode não funcionar bem para o seu caso de uso.

As outras bibliotecas de componentes apresentam chatices similares, com variados níveis de complexidade.

<br>

## 2. Tooling

Algumas extensões no Visual Studio Code auxiliam o desenvolvimento com Tailwind. De destaque, a [Tailwind Docs](https://marketplace.visualstudio.com/items?itemName=austenc.tailwind-docs), que fornece links rápidos para a documentação do Tailwind (que você vai consultar bastante!), e [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), que provê auto-completions e syntax highlighting para as strings que representam classes do Tailwind.

Uma alternativa mais poderosa a essa última extensão, a biblioteca [tailwindcss-classnames](https://www.npmjs.com/package/tailwindcss-classnames) é particularmente útil se está desenvolvendo em TypeScript e a aparente falta de "estaticidade" de nomes de classe te encomodam. Essa biblioteca é um wrapper sobre a clássica função utilitária [classnames](https://www.npmjs.com/package/classnames), que agora além de facilitar a definição de classes condicionais (caso de uso muito frequente ao usar Tailwind), ela faz type-checking, garantindo que os nomes das classes passadas realmente são fornecidos pelo Tailwind.

![classnames](/classNames.png 'classnames')

<br>

## 3. Customização

Bibliotecas de componentes tem um problema bem conhecido: "Todos websites feitos com \<insira biblioteca aqui\> parecem iguais". Essa frase [já foi corretamente desmentida múltiplas vezes](https://bootstrapbay.com/blog/built-with-bootstrap/), e todas as bibliotecas de componentes oferecem opções de customização bem extensivas (em níveis variados de complexidade, e às vezes, até customizáveis demais...), proporcionando a possibilidade de construir intefaces com identidades visuais únicas. Mas a própria vantagem de usar uma biblioteca de componentes carrega em si um limitação fundamental: você está usando componentes prontos.

Nesse sentido, a solução do Tailwind é brilhante: ele cria sistemas de design extensíveis mas restringidos a "_padrões razoáveis_".

Por exemplo, cores. Por padrão, ao usar Tailwind você está restringido a uma [paleta de cores definida pelos autores](https://tailwindcss.com/docs/customizing-colors), que são mais que suficiente para a maioria dos projetos, e ajuda a manter uma identidade visual consistente. Precisa de cores específicas que não está na paleta? Basta adicioná-las na configuração do Tailwind, e novas classes utilitárias serão geradas com as cores configuradas para todas as regras pertinentes (`bg-`, `text-`, etc). O mesmo vale para medidas de espaçamento, largura, altura, bordas, etc. Você _quase_ não se sente sujo ao usar tamanhos fixos!

<br>

## 4. Boilerplate e Facilidade de Uso

A não ser para coisas muito específicas, como por exemplo imagens de background, ao usar Tailwind eu nunca precisei escrever uma linha de CSS. De verdade. As classes utilitárias do Tailwind são suficientes 99% das vezes. Isso não quer dizer que o seu conhecimento de CSS é dispensável, pelo contrário: quanto mais você sabe sobre CSS, mais você saberá utilizar corretamente as classes do Tailwind. Além disso, Tailwind tem suporte de primeira classe para construção de layouts responsivos com breakpoints pré-definidos, que remove a dor de cabeça ao trabalhar com media queries.

Isso é uma diferença notável em comparação a bibliotecas de componentes, talvez ironicamente. Para garantir uma identidade visual única é necessário alterar os estilos padrões dos componentes com CSS, forçando ao desenvolvedor mudar de contexto e deixar de focar no DOM.

É importante ressaltar que os autores bibliotecas de componentes reconhecem esse problema e oferecem soluções como CSS-in-JS e mais recentemente a API [MUI System](https://mui.com/system/basics/), que segue um modelo parecido com o Tailwind.

<br>

## 5. Headless UI

Apesar do Tailwind se completo por si só, você não vai querer implementar do zero componentes comuns como modais em todos os projetos. É possível utilizar o Tailwind junto com bibliotecas de componentes, no entanto, eu não recomendaria, já que você estaria misturando paradigmas de estilização, tornando o código mais difícil de manter.

Com esse intuito, os autores do Tailwind desenvolveram a biblioteca [headless ui](https://headlessui.dev/), que oferece componentes prontos, sem estilos, e que se encaixam completamente com o paradigma do Tailwind.

<br>

---

<br>

Pretendo atualizar esse post quando tiver mais para desabafar sobre o Tailwind.

Até o próximo!
