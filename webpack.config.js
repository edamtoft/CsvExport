const path = require("path");

module.exports = {
  entry: "./source/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "CsvExport.js",
    library: "CsvExport",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}