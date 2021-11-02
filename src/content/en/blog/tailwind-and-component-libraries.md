---
title: TailwindCSS and Component Libraries
summary: Talking about TailwindCSS and component libraries like MUI (material-ui) based on my own experiences
date: 2021-10-13T13:20:00.000Z
tags:
  - css
  - frontend
  - react
  - nextjs
image: /tailwindcss.png
---

# TailwindCSS and Component Libraries

[TailwindCSS](https://tailwindcss.com/) is a utility-based CSS styling system. Its flexibility and ease of use is rapidly turning it into one of the most adopted styling solutions on the web, with [over 1 million weekly downloads on NPM](https://www.npmtrends.com/tailwindcss) currently. In this post, I'd like to share a few things about my experience using this system, without getting into the details of how the library itself works (you can check out the [official documentation](https://tailwindcss.com/docs), which is very well made and complete, by the way)!

My first contact with Tailwind was when it was still in beta. As with many others, my first reaction wasn't too great. "This is worse than inline styles! Impossible to maintain!". And as with many others, my skepticism and knee-jerk reaction proved to be completely wrong. Tailwind adopts the "utility-first" philosophy, which, [as the authors explain](https://tailwindcss.com/docs/utility-first), is an approach in which the benefits are only appreciated when you actually experiment with the system.

As someone who used to really appreciates how fast you can start up projects and prototypes that look relatively nice using component libraries like MUI (Material UI), AntDesign and Bootstrap, after experimenting with Tailwind's paradigm, I don't think I can go back. Here are some of the reasons that got me to this conclusion, based on by own experiences in React projects (mainly with Next.js).

<br>

---

<br>

## 1. Setup

Installing and setting up TailwindCSS is relatively simple. To [add it to a Next.js project](https://tailwindcss.com/docs/guides/nextjs), for example, you only need to run the Tailwind CLI, which will generate the configuration files, and then include the Tailwind CSS in the application, using a regular import or PostCSS. You might have to tweak some configuration values, but it is generally painless to do so.

MUI, on the other hand, is a bit more annoying, specially if you're using server side rendering. In every new project you'll have to configure the theme and set up the SSR configuration so that emotion/styled components work properly. I spent an entire day fixing an SSR/Emotion related issue caused by this in this blog (which uses MUI). The authors have facilitated this process by offering [pre-configured project templates which you can clone](https://github.com/mui-org/material-ui/tree/00827a5725d76fcfba87222837c425a3e8f19cbb/examples/nextjs-with-typescript), but this might not work well depending on your use case.

The other libraries have similar annoyances, with varying complexity levels.

<br>

## 2. Tooling

Some Visual Studio Code extensions make it even easier to develop projects using Tailwind. One of them, [Tailwind Docs](https://marketplace.visualstudio.com/items?itemName=austenc.tailwind-docs), offers easy to access links to the Tailwind docs (which you will check _very_ often!). There's also [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), which offers auto-completions and syntax highlighting to the strings that represent Tailwind classes.

As a powerful alternative to the latter extension, the [tailwindcss-classnames](https://www.npmjs.com/package/tailwindcss-classnames) library is particularly useful if you're using TypeScript and the apparent lack of "staticity" of class names bother you. This library is a wrapper over the classic utility function [classnames](https://www.npmjs.com/package/classnames), which now not only helps defining conditional classs names (which is a frequent Tailwind use case), it also provides type-checking for classes, guaranteeing that they really are offered by Tailwind.

![classnames](/classNames.png 'classnames')

<br>

## 3. Customization

Component libraries have a well known problem: "Every websites built with \<insert library here\> looks the same". This statement [has been correctly debunked multiple times](https://bootstrapbay.com/blog/built-with-bootstrap/), and every component library offers very extensive customization options (in varying complexity levels, and, sometimes, they're even _too_ customizable...), allowing you to build UI with very distinct visual identities. However, the advantage of using component libraries is by itself a fundamental limitation: you are using components that were not built by you.

In that sense, the solution offered by Tailwind is brilliant: it creates extensible design systems constrained by "_sensible defaults_".

For example, colors. By default, when you use Tailwind you're constrained by a [color palette defined by the authors](https://tailwindcss.com/docs/customizing-colors), that are more than enough for most projects, and help maintain a consistent visual identity. Need a specific color that isn't in the palette? All you have to do is add it to the Tailwind configuration file, and new utility classes will be generated for the new color in every relevant rule (`bg-`, `text-`, etc). The same thing goes for spacing sizes, width, height, borders, etc. You _almost_ don't feel dirty when you use fixed sizes!

<br>

## 4. Boilerplate e Ease of Use

Except for very specific things, like background images, when I've used Tailwind I never had to write a single line of CSS code. I'm serious. The Tailwind utility classes are enough 99% of the time. That doesn't mean your CSS knowledge is useless, it's the opposite: the more you know about CSS, the more you'll know how to properly use Tailwind's classes. Also, Tailwind has first-class support for building responsive layouts with pre-defined breakpoints, which saves a lot of the headache that comes with media queries.

This is a notable difference when compared to component libraries, perhaps ironically. To guarantee a unique visual identity you have to change the default component styles with CSS, forcing the developer to switch contexts and stop focusing on the DOM.

It's important to point out that component library authors acknowledge this flaw and embrace CSS-in-JS, and, more recently the [MUI System](https://mui.com/system/basics/) API, which follows a paradigm that feels very similar to Tailwind's in this regard.

<br>

## 5. Headless UI

Although Tailwind is very complete by itself, you don't want to implement some common components like modals from scratch across multiple projects. It's possible to use Tailwind along with component libraries that offer such components, but I wouldn't recommend it, since you'd be mixing multiple different styling paradigms, making your code harder to maintain.

With this in mind, Tailwind's authors developed [headless ui](https://headlessui.dev/), which offers unstyled common components, and are completely compatile (and intended to be used) with Tailwind.

<br>

---

<br>

I'll try to update this post whenever I feel like I have more to say about Tailwind.

See you in the next one!
