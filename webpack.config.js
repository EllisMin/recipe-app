const path = require("path");
// Takes src/index.html to dist
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Where it starts bundling
  entry: ["./src/js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  devServer: {
    // Where the local server runs
    contentBase: "./dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      // npm run dev to create file to dist
      // npm run start to start the server with index.html in src folder
      filename: "index.html",
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      }
    ]
  }
};
