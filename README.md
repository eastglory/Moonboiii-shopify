# XRPL Moonboiii-collective shopify 

MoonBoiii Collective is an innovative project aiming to change the game in the NFT space. By becoming a legal utility for NFT holders and a source of income for talented artists worldwide, we create a community where everyone benefits.
    
# Requirements

- [Node.js](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/)
- [NPM](https://www.npmjs.com/get-npm)
- [Shopify ThemeKit](https://shopify.github.io/themekit/)
- [Local version of a shopify theme connected to your store](https://www.shopify.com/partners/blog/95401862-3-simple-steps-for-setting-up-a-local-shopify-theme-development-environment)

# Installation

### Download Shopify theme

    theme download

### Install Node dependencies

    npm install 
    
### Test shopify theme

    npm run dev
    theme watch --allow-alive
    
### Deploy theme

    npm run build
    theme deploy
   
# Project structure
```
└─Moonboiii-collective
    ├───assets
    ├───config
    ├───layout
    ├───locales
    ├───node_modules
    ├───scripts
    │   └───Components
    │   	└───DayPicker.js
    │   	└───LoginDialog.js
    │   	└───QRCodeSvg.js
    │   	└───RegisterForm.js
    │   	└───XummButton.js
    │   └───register-form.js
    │   └───xumm-login.js
    ├───sections
    ├───snippets
    ├───templates
    ├───.babelrc
    ├───.gitignore
    ├───config.yml
    ├───package-lock.json
    ├───package.json
    ├───webpack.common.js
    ├───webpack.dev.js
    └───webpack.prod.js
```
