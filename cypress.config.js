const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(cypressOn, config) {

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      cypressOn("file:preprocessor", bundler);
      const on = require('cypress-on-fix')(cypressOn)
      allureWriter(on, config);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "http://devtodo.monfared.io/",
    chromeWebSecurity: false,
    projectId: "vs37wz",
  },
});
