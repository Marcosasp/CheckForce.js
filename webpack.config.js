const webpack = require("webpack");
const path = require("path");
var PACKAGE = require("./package.json");
const year = new Date().getFullYear();
var banner = `${PACKAGE.name} - ${PACKAGE.version} (c) ${year}, ${PACKAGE.author} |
  ${PACKAGE.license} | ${PACKAGE.homepage}`;

module.exports = (env = {}) => {
  // Adicionado um objeto vazio padrão para evitar quebras se 'env' for undefined
  // Garante que o código funcione nos testes se env vir vazio
  const BUNDLE = env.BUNDLE === "true" || env.BUNDLE === undefined;
  const MINIFY = env.MINIFY === "true";

  let fileDest = `checkforce`;
  const externals = {
    "@popperjs/core": "Popper",
    zxcvbn: "zxcvbn",
  };

  if (BUNDLE) {
    fileDest += ".bundle";
    // Remove
    delete externals["@popperjs/core"];
    delete externals["zxcvbn"];
  }

  return {
    entry: "./src/index.js",
    mode: MINIFY ? "production" : "development",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: MINIFY ? `${fileDest}.min.js` : `${fileDest}.js`,
      library: {
        name: "CheckForce",
        type: "umd",
      },
      libraryExport: "default",
      publicPath: "/",
    },
    devtool: "source-map",
    externals: externals,
    resolve: {
      alias: {
        // Redireciona chamadas globais de 'Popper' para a pasta correta do módulo instalado
        Popper: path.resolve(__dirname, "node_modules/@popperjs/core"),
      },
      fallback: {
        // Resolve o erro de "Can't resolve 'assert'" trazido pelo Webpack 5
        assert: require.resolve("assert/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "./"),
      },
      port: 9000,
    },
    plugins: [
      new webpack.BannerPlugin(banner),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  };
};
