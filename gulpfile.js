var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var pump = require('pump');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
// var connect = require('gulp-connect-php');
// var bower = require('gulp-bower');

var paths = {
  bowerDir: './bower_components',
  sassDir: './resources/sass',
  jsDir: './resources/js',
  fontDir: './resources/fonts',
  imageDir: './resources/images/',
  rootDir: ['./assets'],
};

// gulp.task('bower', function() {
//     return bower()
//       .pipe(gulp.dest(paths.bowerDir));
// });

gulp.task('icons', function() {
    return gulp.src([
        // paths.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*',
        // paths.bowerDir + '/font-awesome/fonts/**.*'
      ])
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('commonJS', function() {
    return gulp.src([
        paths.bowerDir + '/jquery/dist/jquery.min.js',
        paths.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js'
      ])
        .pipe(gulp.dest(paths.rootDir + '/js'));
});
 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('resources/js/**/*.js'),
        uglify(),
        gulp.dest('assets/js')
    ],
    cb
  );
});

gulp.task('sass', function(){
  return gulp.src('resources/sass/**/*.scss')
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }).on('error', sass.logError))
    // .pipe(minifyCSS())
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload());
});

gulp.task('html', function () {
  return gulp.src('./assets/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
    var reload = livereload();
    livereload.listen();
    gulp.watch('./resources/sass/**/*.scss', ['sass']);
    gulp.watch(['./assets/*.html'], ['html']);
    livereload();
  });

/* Gulp PHP Server */
gulp.task('server', function() {
  connect.server({
    port: 8081,
    root: './assets/',
    livereload: true
  });
});


gulp.task('default', [ 'compress', 'sass' ]);
gulp.task('serve', ['watch', 'server' ]);
gulp.task('start', ['watch', 'sass' ]);
