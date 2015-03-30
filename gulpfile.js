var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass');

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
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('assets', function() {
  // Watch frontend js and hint
  // lint
  // minify js
  // watch sass and output css
  // 
});

gulp.task('deploy', function() {
  nodemon({
    script: 'bin/www'

  });
});