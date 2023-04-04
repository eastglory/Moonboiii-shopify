
const path = require("path")

module.exports = {
  entry: {
    'xumm-login': "./scripts/xumm-login.js",
    'register-form': "./scripts/register-form.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
        },
      },
      {
          test: /\.css$/,
          use: [
              'style-loader',
              'css-loader'
          ]
      }
    ]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "assets")
  }
}
