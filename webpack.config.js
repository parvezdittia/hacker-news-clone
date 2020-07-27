const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/hydrate.js",

  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "./functions/static"),
    publicPath: "/static/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  externals: {
    moment: "moment",
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: "-",
      cacheGroups: {
        commons: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, "./functions/static"),
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};
