<h1 align="center">Welcome to barSync 👋</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Hello and welcome to barSync!

### Description

barSync is a web app that helps users manage their cocktail ingredients and discover new drinks. Users can easily track the ingredients they have at home, and use these ingredients to filter for cocktails which they can make with those ingredients.

## Screenshot

<img src="/client/src/assets/screenshot.png" />

## Tech stack

barSync is built with a react front end styled with vanilla CSS. The back end runs off an express server linked in to a postgres SQL database using sequelize ORM.

### Getting started:

This project requires node.js and npm so please make sure you have these installed and working correctly!

First clone this repo:

```sh
git clone https://github.com/Billhaigh13/barSync.git
```

### Please note:

You will need to create a `.env` file within the server folder.
This file will need to contain the following details:

_PORT_ - the port you would like your server to run on

_DATABASE_NAME_ - the name of your psql database

_DATABASE_USER_ - db username

_DATABASE_PASS_ - db password

This project uses [thecocktaildb](https://www.thecocktaildb.com/) API. It uses a premium API key the instructions of how to obtain one can be found on the link (costs £2 a month).

_API_URL_ - here is where you put the api url

_API_KEY_ - api key

## Install

1. cd into the client folder and run:

```sh
npm install
```

2. cd into the server folder and run:

```sh
npm install
```

3. You are now ready to go! Run:

```sh
npm run dev
```

from both the client and server folders.

## Author

👤 **Bill Haigh**

- Github: [@Billhaigh13](https://github.com/Billhaigh13)
- LinkedIn: [@BillHaigh](https://www.linkedin.com/in/bill-a-a44234240/)

## Credit

👤 **Benjamin McCarthy**

-Github: [@dripstltd](https://github.com/dripstaltd)

- created the excellent logo

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
