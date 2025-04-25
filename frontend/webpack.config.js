// webpack.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = [
  {
    // configuration client
    entry: './client/index.js',
    output: { /* … */ },
    resolve: {
      extensions: ['.js', '.jsx']   // <- Permet d'importer sans préciser .jsx
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  },

  // webpack.config.js (client section)

module.exports = [
  {
    target: 'web',
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'client.bundle.js',
      publicPath: '/',      // important pour historyApiFallback
    },
    resolve: { extensions: ['.js','.jsx'] },
    module: { rules: [ /* babel-loader… */ ] },
    devServer: {
      port: 8080,
      static: { directory: path.resolve(__dirname, 'public') },
      historyApiFallback: true,       // pour que /notes, /planning… ne 404
      proxy: {
        '/': 'http://localhost:3000'  // proxy tous les GET vers ton SSR
      }
    }
  },
  /* ta config server ici… */
],
  // config server
  {
    entry: './server/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: { path: path.resolve(__dirname, 'dist'), filename: 'server.bundle.js' },
    module: { rules:[{ test:/\.jsx?$/, loader:'babel-loader', exclude:/node_modules/ }] }
  }
];