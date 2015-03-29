var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('watch', function() {
  // Watch backend js and restart server
  gulp.src(['routes/','app.js']);
});

gulp.task('assets', function() {
  // Watch frontend js and hint
  // lint
  // minify js
  // watch sass and output css
  // 
});