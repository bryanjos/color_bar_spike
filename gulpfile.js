var gulp = require('gulp');
//var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var spawn = require("gulp-spawn");
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var exec = require('child_process').exec;

var cssSrc = 'src/css/*.scss';
var cssDest = 'dest/css';

var jsSrc = 'src/js/**/*.js*';
var exjsSrc = 'src/exjs/**/*.exjs';
var jsDest = 'dest/js'


function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('build-exjs', function(cb) {
  exec('/usr/local/ex2js/bin/ex2js "' + exjsSrc + '" -o ' + "src/js", function (err, stdout, stderr) {
    cb(err);
  });
});

gulp.task('build-js', ['build-exjs'], function() {
  return gulp.src(jsSrc)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(babel({sourceMap: false, modules: 'system'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(jsDest));
});

gulp.task('build', ['build-exjs', 'build-js']);

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
  gulp.watch([exjsSrc, cssSrc, 'index.html'], ['build']).on('change', reportChange);
});


gulp.task('default', ['build']);
