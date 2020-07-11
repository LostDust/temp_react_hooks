const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const ENV = process.env.NODE_ENV.trim();

module.exports = {
  mode: ENV,
  devtool: ENV === "development" ? "cheap-module-eval-source-map" : "none",
  entry: {
    app: `./src/app.js`,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(`./dist`),
  },
  plugins: [
    new HTMLPlugin({
      template: `./src/index.html`,
      filename: "index.html",
    }),
    new DefinePlugin({
      HOST:
        ENV === "development"
          ? '"http://localhost:8080/"'
          : '"http://106.52.253.134:7070/"',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, `src`),
      "@@": path.resolve(__dirname, `src/components`),
      "&": path.resolve(__dirname, `assets`),
    },
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]-[local]",
              },
            },
          },
          "less-loader",
        ],
      },
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.(jpg|png|gif|svg|ttf|woff|woff2|eot)$/,
        loader: "url-loader",
      },
    ],
  },
};
