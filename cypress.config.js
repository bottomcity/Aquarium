const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env : {
    username : 'testsquid39testsquid39testsquid39testsq'
  },

  e2e: {
    baseUrl: 'https://app.devsquid.net/',

    chromeWebSecurity: false,

    defaultCommandTimeout: 2000,

    viewportWidth: 1280,
    viewportHeight: 720

  },
});