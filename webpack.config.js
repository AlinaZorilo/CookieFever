const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin');

var plugins, cssloaders, jsloaders, mainjs, entry;

if (process.env.NODE_ENV === 'development') {
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/
    })
  ];
  
  mainjs = [
    'webpack-hot-middleware/client',
    './src/index.js'
  ];
  
  entry = {
    'main.js': mainjs
  };

  cssloaders = ['css-loader', 'ruby-sass-loader?outputStyle=expanded&compass=true&cwd=' + path.resolve(__dirname, './'), {
      loader: 'sass-resources-loader',
      options: {
          resources: path.resolve(__dirname, './src/scss/index.scss')
      }
  }];

  jsloaders = ['react-hot-loader/webpack', 'babel-loader'];
} else {
  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ];
  
  mainjs = './src/index.js';
  
  entry = {
    'main.js': mainjs,
    'style.css': './src/scss/index.scss'
  }; 

  cssloaders = ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader',
      options: {
        minimize: true
      }
    }, {
      loader: 'ruby-sass-loader?outputStyle=expanded&compass=true&cwd=' + path.resolve(__dirname, './')
    }, {
      loader: 'sass-resources-loader',
      options: {
          resources: path.resolve(__dirname, './src/scss/index.scss')
      }
    }]
  });

  jsloaders = ['babel-loader'];
}

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-module-eval-source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
    publicPath: '/dist/'
  },
  plugins: plugins,
  module: {
    loaders: [{
        test: /\.(scss|sass|css)$/,
        loaders: cssloaders
    }, {
        test: /\.jsx?$/,
        loaders: jsloaders,
        include: path.join(__dirname, 'src')
    },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader'
    }]
  }
};
