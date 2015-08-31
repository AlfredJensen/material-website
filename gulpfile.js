'use strict'

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    sourceMaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('start', function () {
  nodemon({
    script: 'bin/www', 
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' }
  });
});
 
gulp.task('sass', function () {
  // process.stdout.write('[INFO] Change detected SCSS generating CSS.\n');
  
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
  
  // process.stdout.write('[INFO] CSS Successfully generated.\n');
});

var bowerJSFiles = [
  './public/bower_components/angular/angular.min.js',
  './public/bower_components/angular-animate/angular-animate.min.js',
  './public/bower_components/angular-aria/angular-aria.min.js',
  './public/bower_components/angular-sanitize/angular-sanitize.min.js',
  './public/bower_components/angular-material/angular-material.min.js',
  './public/bower_components/angular-route/angular-route.min.js',
  './public/bower_components/hammer/hammer.min.js'
];

var myJSFiles = [
  './public/js/app.js',
  './views/projects/projects.js',
  './views/home/home.js',
  './public/js/lazy-javascript.js'
];

gulp.task('concat', function() {
  gulp.src(bowerJSFiles)
    .pipe(concat('./bower_components/bower_components.min.js'))
    .pipe(gulp.dest('./public/'));

  gulp.src(myJSFiles)
    .pipe(sourceMaps.init())
    .pipe(concat('./js/alfred-material.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
  // Need to add JSLint here
  gulp.watch('./scss/*.scss', ['sass']);

  gulp.watch(bowerJSFiles.concat(myJSFiles), ['concat']);
});

gulp.task('minify', function() {
  // Minify JS, CSS, IMAGES Here
});

gulp.task('deploy', function() {
  nodemon({
    script: 'bin/www'
    ext: 'js hbs',
    env: { 'NODE_ENV': 'production' }
  });
});