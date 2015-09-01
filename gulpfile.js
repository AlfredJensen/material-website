'use strict'

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    sourceMaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

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

var projectImageFiles = [
  './public/imgs/projects/md-grey-circle.png',
  './public/imgs/projects/md-orange-pyramids.png',
  './public/imgs/projects/md-site-cover.png',
  './public/imgs/projects/md-teal-tri.png'
];

var homeImageFiles = [
  './public/imgs/materialLongboard.png',
  './public/imgs/codeghost.png'
];

gulp.task('sass', function () {
  // process.stdout.write('[INFO] Change detected SCSS generating CSS.\n');
  
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
  
  // process.stdout.write('[INFO] CSS Successfully generated.\n');
});

gulp.task('imagemin', function() {
  gulp.src(projectImageFiles)
  .pipe(imagemin());

  gulp.src(homeImageFiles)
  .pipe(imagemin());
  // .pipe(gulp.dest('dist/images'));
});

gulp.task('minify', function() {
  gulp.src('./public/js/alfred-material.js')
        .pipe(concat('alfred-material.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({ 'mangle' : false }))
        .pipe(gulp.dest('./public/js'));
});

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

  gulp.watch(myJSFiles.concat(bowerJSFiles), ['concat']);
});

gulp.task('start', function () {
  nodemon({
    script: 'bin/www', 
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('deploy', function() {
  nodemon({
    script: 'bin/www',
    ext: 'js html',
    tasks: ['sass', 'concat', 'minify', 'imagemin'],
    env: { 
      'NODE_ENV': 'production',
      'PORT' : '80'
     }
  });
});