// Karma configuration
// Generated on Sun Dec 02 2018 15:14:17 GMT-0400 (-04)

// Executa a função de configuração do webpack simulando o ambiente de teste
const webpackConfigFn = require("./webpack.config.js");
const webpackConfig = webpackConfigFn({ BUNDLE: "true", MINIFY: "false" });

module.exports = function (config) {
  config.set({
    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chrome-launcher"), // Substituído phantomjs por chrome-launcher
    ],
    // frameworks to use
    frameworks: ["mocha"],

    // list of files / patterns to load in the browser
    files: [
      // Garante que o Popper seja carregado globalmente no navegador de testes
      "node_modules/@popperjs/core/dist/umd/popper.min.js",
      "src/**/*.js",
      "test/**/*.js",
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      "src/**/*.js": ["webpack"],
      "test/**/*.js": ["webpack"],
    },

    // Passa a configuração COMPLETA do webpack corrigida para os testes
    webpack: webpackConfig,

    client: {
      mocha: {
        timeout: 6000,
      },
    },

    // start these browsers
    browsers: ["Chrome"],
  });
};
