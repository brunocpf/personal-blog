---
title: Recent Projects
summary: Some of the projects I've worked on recently
date: 2021-10-18T10:19:33.122Z
tags:
  - projects
---

# Recent Projects

As I've said previously, I'd like to share some of my "hobby" projects I've been working on the side.

---

## 1. [next-tailwind-base](https://github.com/brunocpf/next-tailwind-base)

A Next.JS PWA boilerplate with Tailwind, TypeScript, Jest and Storybook, containing my environment preferences (eslint/prettier/vscode config) and my preferred directory structure, to save time when creating new projects.

I still need to clean it up and remove some remaining code from previous projects.

---

## 2. [ecommerce-frontend](https://github.com/brunocpf/ecommerce-frontend)

A fully responsive PWA ecommerce template, using Next.js (React), TypeScript, TailwindCSS, GraphQL, Stripe, framer-motion and JWT/httponly cookie authentication.

Everything is ok, I just need to change up desing a little and make it so color schemes, store name, logo, styles etc are more generic and configurable, possibly using environment variables.

![Home](/projects/home.png)
![Products](/projects/products.png)
![Product](/projects/product.png)

---

## 3. [ecommerce-backend](https://github.com/brunocpf/ecommerce-backend)

An ecommerce backend template using the strapi CMS + GraphQL and Stripe for payinments, which is a companion to the PWA mentioned above. Includes secure reading of the httponly cookie set by the frontend project with CORS to identify the logged in users and create orders.

Strapi is a fully featured CMS, and everything is working fine, but unfortunately it doesn't support TypeScript, which is kind of a deal breaker for me. I'm trying to figure out a way to transpile TypeScript in a Strapi project, but I still haven't completed my research. I'll make a blog post about it as soon as I do.

---

## 4. [expo-paper-base](https://github.com/brunocpf/expo-paper-base)

Another boilerplate, very similar to next-tailwind-base, except it is for projects using Expo (React Native) + React Native Paper. The directory structure is very similar besides the navigation (react navigation in React Native vs page routes in Next.js).

---

## 5. [barapp](https://github.com/brunocpf/barapp)

App with information about local night clubs and bars (still unnamed). Still at the beginning stages and being built with a Next.js PWA, but it'll change into a React Native/Expo app, and use Amazon AppSync or Strapi as a GraphQL backend.

![BarApp](/projects/barapp.png)

---

## 6. [systrash](https://github.com/brunocpf/systrash)

Simple app built with Expo/React Native and Next.JS (PWA) about local recycling companies, including a Google Forms survey.

![SysTrash](/projects/systrash.png)

---

## 6. [bruno-fernandes.dev](https://github.com/brunocpf/personal-blog)

This personal blog, built as a PWA using Next.js, MUI (material ui) v5, TypeScript and framer-motion, with static site generation.

Currently posts are read from markdown files in build time to generate pages. but I want to change it to use an actual CMS and implement a search system. I experimented with Firebase/Firestore but it seems overkill, not to mention the fact that it doesn't have built in full-text search without third party tools like Algolia. Netlify-cms seems to be a free and sufficient alternative, but I still haven't looked into it.
