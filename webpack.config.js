const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  // ouput: {
  //   path: path.resolve(__dirname, '/dist'),
  //   filename: 'main.js'
  // },
	mode: 'development',
  
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['.js', '.jsx']
	},

	module: {
		rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
      // {
      //   test: /\.(png|jpe?g)/,
      //   use: [
      //     {
      //       loader: 'file-loader'
      //     }
      //   ]
      // }
    ]
	},

	plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ],

	devServer: {
    port: 5670,
    proxy: [
      {
        context: ['/*'],
        target: 'http://localhost:8760'
      }
    ]
  }
}