var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var currentEnv = 'development';

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function createEnvConstants () {
    var myConfig = require('../envConstants.json');
    var envConstants = myConfig[currentEnv];
    return $.ngConstant({
        constants: envConstants,
        name: 'envConstants',
        stream: true
    })
    .pipe(gulp.dest(path.join(conf.paths.src)));
}

function createEnvConstantsProduction () {
    currentEnv = 'production';
    createEnvConstants();
}

gulp.task('env-constants-development', createEnvConstants);
gulp.task('env-constants-production', createEnvConstantsProduction);