var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watchify = require('watchify');

gulp.task('build', function (){
  return browserify('./app.js')
  .transform(babelify, {presets: ["es2015"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.'));
});
