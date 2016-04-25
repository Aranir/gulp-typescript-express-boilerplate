require('shelljs/global');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
// var WebpackDevServer = requaddProgressPlugin.jsire('webpack-dev-server');
// var addProgressPlugin = require('./addProgressPlugin');
var statsOptions = require('./statsOptions');

var serverConfig = require(path.join(__dirname, 'webpack.config.js'));


// addProgressPlugin(serverConfig);


// serverConfig.plugins.push(new webpack.BannerPlugin(
//   'require("source-map-support/register");\n' +
//   'var Npm = Meteor.__mwrContext__.Npm;\n' +
//   'var require = Npm.require;\n',
//   {raw: true}
// ));


var serverCompiler = webpack(serverConfig);
var serverBundleReady = false;

serverCompiler.watch({
  progress: true,
  colors: true,
}, function(err, stats) {
  console.log(stats.toString(statsOptions)) ;
//   updateRequireServerBundleJs(stats);
  if (!serverBundleReady) {
    serverBundleReady = true;
    run()
  }
});


function run() {
  exec('nodemon build/backend.js', {async: true});
}
