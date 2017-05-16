var gulp = require('gulp'),
// Requires the gulp-sass plugin
sass = require('gulp-sass'),
browserSync = require('browser-sync').create();

const SASS_SOURCE = './public/scss/*.scss';
const SASS_DESTINATION = './public/css/';

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './public/'
    },
  });
});

gulp.task('sass', function(){
  return gulp.src(SASS_SOURCE)
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest(SASS_DESTINATION))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['sass'], function (){
  gulp.watch(SASS_SOURCE, ['sass']); 
  // Other watchers
})