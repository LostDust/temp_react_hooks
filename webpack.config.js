const path = require("path");
const { DefinePlugin } = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const CssPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MODE = process.env.NODE_ENV.trim();
// const MODE = process.env.npm_package_config_mode;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: MODE,
  devtool: MODE === "development" ? "cheap-module-eval-source-map" : "none",
  entry: {
    app: `./src/app.js`,
  },
  output: {
    filename: "[name].[hash:4].js",
    path: path.resolve(`./dist`),
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({ extractComments: false }),
      new OptimizeCSSPlugin(),
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HTMLPlugin({
      template: `./src/index.html`,
      filename: "index.html",
      minify: { collapseWhitespace: true },
    }),
    new CssPlugin({
      filename: "[name].[hash:4].css",
    }),
    new DefinePlugin({
      HOST:
        MODE === "development"
          ? '"http://localhost:8080/"'
          : '"http://106.52.253.134:7070/"',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, `./src`),
      "@@": path.resolve(__dirname, `./src/components`),
      "#": path.resolve(__dirname, `./plugin`),
      "%": path.resolve(__dirname, `./assets`),
    },
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          CssPlugin.loader,
          {
            loader: "css-loader",
            // options: {
            //   modules: {
            //     localIdentName: "[name]-[local]",
            //   },
            // },
          },
          "less-loader",
        ],
      },
      { test: /\.css$/, use: [CssPlugin.loader, "css-loader"] },
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.(jpg|png|gif|svg|ttf|woff|woff2|eot)$/,
        loader: "url-loader",
      },
    ],
  },
};
