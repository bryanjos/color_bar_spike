var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var spawn = require("gulp-spawn");
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

var cssSrc = 'src/css/*.scss';
var cssDest = 'dest/css';

var jsSrc = 'src/js/**/*.js*';
var exjsSrc = 'src/exjs/**/*.exjs';
var jsDest = 'dest/js'


function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('build-sass', function() {
  gulp.src(cssSrc)
      .pipe(sass())
      .pipe(concat('app.css'))
      .pipe(gulp.dest(cssDest));
});

gulp.task('build-exjs', ['build-elixir-lib'], function() {
  return gulp.src(exjsSrc)
  .pipe(plumber())
  .pipe(spawn({ cmd: '/usr/local/ex2js/bin/ex2js', args: ["-st"] }))
  .pipe(babel({sourceMap: false, modules:'system'}))
  .pipe(rename({extname: '.js'}))
  .pipe(gulp.dest(jsDest));
});

gulp.task('build-elixir-lib', function() {
  return gulp.src("/usr/local/ex2js/elixir.js")
  .pipe(babel({sourceMap: false}))
  .pipe(gulp.dest(jsDest));
});

gulp.task('build-js', function() {
  return gulp.src(jsSrc)
      .pipe(plumber())
      .pipe(babel({sourceMap: false, modules:'system'}))
      .pipe(gulp.dest(jsDest));
});

gulp.task('build', ['build-exjs', 'build-js', 'build-sass']);

gulp.task('serve', ['build'], function(done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});


gulp.task('watch', ['serve'], function() {
  gulp.watch([exjsSrc, jsSrc, cssSrc, 'index.html'], ['build']).on('change', reportChange);
});


gulp.task('default', ['build']);