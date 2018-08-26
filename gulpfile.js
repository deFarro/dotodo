'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');

const del = require('del');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

const KarmaServer = require('karma').Server;

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('build', ['clean', 'test'], () => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      console.error(err);
    }
  });
});

gulp.task('serve', () => {
  webpackConfig.entry.unshift("webpack-dev-server/client?http://localhost:8080/");

  new WebpackDevServer(webpack(webpackConfig), {
		publicPath: "/" + webpackConfig.output.publicPath,
    stats: "errors-only"
	}).listen(8080, "localhost", (err) => {
  		if (err) {
         console.log(err);
      }
  	});
  console.log('Serving: localhost:8080');
});

gulp.task('test', (done) => {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['serve']);
