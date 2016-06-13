var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var gulp     = require('gulp');
var del      = require('del');
var sequence = require('run-sequence');
var uncss    = require('gulp-uncss');

// Check for --production flag
var isProduction = !!(argv.production);

var paths = {
  assets: [
    'source/**/*.*',
    'source/*.*',
    '!source/assets/{scss,js}/**/*.*'
  ],
  sass: [
    'source/assets/scss',
  ],
  libraries: [
    'bower_components/d3/d3.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-ui/jquery-ui.js',
    'bower_components/moment/moment.js'
  ],
  fonts: [
    'bower_components/font-awesome/fonts/**/*.*'
  ],
  css: [
    'bower_components/font-awesome/css/**/font-awesome.min.css',
    'bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css'
  ],
  appJS: [
    'source/assets/js/app.js',
    'source/assets/js/**/*.js',
  ]
}

// Cleans the build directory
gulp.task('clean', function(callback) {
  return del('build', callback);
});

// Copies everything in the client folder except Sass and JS
gulp.task('copy', function(callback) {
  return gulp.src(paths.assets, {
    base: 'source/'
  })
    .pipe(gulp.dest('build'))
  ;
});

// Compiles Sass
gulp.task('sass', function () {
  //var minifyCss = $.if(isProduction, $.minifyCss());

  return gulp.src('source/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    //.pipe(minifyCss)
    .pipe(gulp.dest('build/assets/css/'))
  ;
});

// Compiles application
gulp.task('uglify', ['copy:libraries', 'copy:fonts', 'copy:css', 'uglify:js'])

gulp.task('copy:libraries', function(callback) {
  return gulp.src(paths.libraries)
    .pipe(gulp.dest('build/assets/js/'))
  ;
});

gulp.task('copy:fonts', function(callback) {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('build/assets/fonts/'))
  ;
});

gulp.task('copy:css', function(callback) {
  return gulp.src(paths.css)
    .pipe(gulp.dest('build/assets/css/'))
  ;
});

gulp.task('uglify:js', function(callback) {
  var uglify = $.if(isProduction, $.uglify({mangle: false})
    .on('error', function(e) {
      console.log(e);
    }));

  var babel = $.if(isProduction, $.babel({compact: false})
    .on('error', function(e) {
      console.log(e);
    }));

  return gulp.src(paths.appJS)
    .pipe(babel)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('build/assets/js/'))
  ;
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', ['build'], function() {
  gulp.src('build/')
    .pipe($.webserver({
      port: 8079,
      host: '127.0.0.1',
      fallback: 'index.html',
      livereload: true,
      open: true
    }))
  ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function(callback) {
  sequence('clean', ['copy', 'sass', 'uglify'], callback);
});

// Default task: builds your app and recompiles assets when they change
gulp.task('default', ['server'], function () {

  // Watch Sass
  gulp.watch(['source/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['source/assets/js/**/*', './js/**/*'], ['uglify:js']);

  // Watch static files
  gulp.watch(['source/**/*.*', '!source/assets/{scss,js}/**/*.*'], ['copy']);

});
