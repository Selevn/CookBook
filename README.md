# Getting Started with CookBook

## Available Scripts

#### Before we start

1. Put `.env` file in `cookbook` directory
2. Use command inside `cookbook`: `npm i`
3. Use command inside `cookbook/server`: `npm i`
4. Use command inside `cookbooks/server/Keys`:  `node generateKeys.js` for generating JWT key pair
---

In the `cookbook` directory, you can run:

### `npm run dev`

Runs frontend and backend sides of project.

Backend works on localhost:5000 and frontend is on localhost:3000

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Description

This is ITechArt trainee project which develops by **_Skorodumov Ivan_**

This service allows you lookups different cookbooks, recipes, reads someone else's comments and send yours

Save cookbooks, recipes in your collection. Create own cookbooks and recipes.

#### Functionality:

- [x] Frontend base adaptive layout
- [x] Backend data loading
- [x] Lazy loading
- [ ] Authorization and authentication

# Documentation

### Server side ###

Server is in `cookbook/server` directory.

It has it's own `node_modules` folder

* `models` contains database models
* `Data` contains modules to fetch and normalize data from *mongodb*

### Client side ###

Client is in `cookbook/src` directory.

* `components` contains all React components
    * `common` contains common _resources_ like an images, fonts, styles, etc...
    * `MultyUsed` contains Components which uses or will be used in more than one place
    * **all** another directories contains components which names and functionality represents folder name
* `Connectors` contains module with fetch server data functions
* `globalStyles.js` contains global styles, which initializes with React project
* `constants.js` contains global constants which same for client and server
* `index.css` contains global css presets which initializes before react
* `constans.css` contains global css color variables