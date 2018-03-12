var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var fs = require('fs');
var wm = require('webpack-dev-middleware');
var whm = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(config);

app.use(wm(compiler, {
  publicPath: config.output.publicPath
}));

app.use(whm(compiler));

app.listen(3000);