const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const WebpackPwaManifest = require("webpack-pwa-manifest")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require("autoprefixer")

module.exports = {
  entry: "./src/javascript/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "src/index.html",
      favicon: "src/images/AppIcon48.png"
    }),
    new WebpackPwaManifest({
      short_name: "Michael",
      name: "Michael Farník",
      start_url: "michaelfarnik.js.org",
      background_color: "#617a92",
      display: "standalone",
      theme_color: "#617a92",
      icons: [
        {
          src: path.resolve("src/images/AppIcon192.png"),
          sizes: "192x192"
        },
        {
          src: path.resolve("src/images/AppIcon512.png"),
          sizes: "512x512"
        }
      ]
    }),
    new MiniCssExtractPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer()
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {}
        }
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader"
        ]
      }
    ]
  }
}