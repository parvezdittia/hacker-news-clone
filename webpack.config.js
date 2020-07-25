const path = require("path");

console.log(path.resolve(__dirname, "./functions/src/static"));

module.exports = {
  entry: "./src/hydrate.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./functions/static/js"),
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
};
