'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var webpack = require('webpack-stream');

var $ = require('gulp-load-plugins')();


function webpackWrapper(watch, build_debug, test, callback) {
  var webpackOptions = {
    resolve: { extensions: ['', '.ts'] },
    watch: watch,
    module: {
      preLoaders: [{ test: /\.ts$/, exclude: /node_modules/, loader: 'tslint-loader'}],
      loaders: [{ test: /\.ts$/, exclude: /node_modules/, loaders: ['ng-annotate', 'awesome-typescript-loader']}]
    },
    output: { filename: 'index.module.js' }
  };

  if(watch || build_debug) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if(err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if(watch) {
      watch = false;
      callback();
    }
  };

  var sources = [ path.join(conf.paths.src, '/app/index.module.ts'), path.join(conf.paths.src, '/ngConstants.js') ];
  if (test) {
    sources.push(path.join(conf.paths.src, '/app/**/*.spec.ts'));
  }

  return gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function () {
  return webpackWrapper(false, false, false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpackWrapper(true, false, false, callback);
});

gulp.task('scripts:build-debug', ['scripts'], function (callback) {
  return webpackWrapper(false, true, false, callback);
});

gulp.task('scripts:test', function () {
  return webpackWrapper(false, false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function (callback) {
  return webpackWrapper(true, false, true, callback);
});
