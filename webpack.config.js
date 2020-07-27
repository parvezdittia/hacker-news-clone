const path = require("path");

module.exports = {
  entry: "./src/hydrate.js",

  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "./functions/static/js"),
    publicPath: "/static/js/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
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
};
