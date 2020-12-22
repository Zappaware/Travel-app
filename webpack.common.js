const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/client/index.js',
   output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack.bundle.js',
    libraryTarget: 'var',
    library: 'Client'
},
plugins:[
new HtmlWebPackPlugin({
    template: "./src/client/views/index.html",
    filename: "./index.html",
    }),
new Dotenv()    
  ]
 };