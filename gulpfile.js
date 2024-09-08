const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('less', function () {
  return gulp.src('./src/css/*.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: './'
  });

  gulp.watch('./src/css/*.less', gulp.series('less'));
  gulp.watch('./src/js/*.js', gulp.series('js'));
  gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('less', 'js', 'serve'));
